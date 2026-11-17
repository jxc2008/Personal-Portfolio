import { DepthParallaxRenderer } from "./DepthParallaxRenderer";
import { createEffects, starTwinkleWeight, type Effect, type FxFrame } from "./effects";
import {
  coverScale,
  DEFAULT_PARALLAX,
  project,
  zoomFor,
  type ParallaxParams,
  type View,
} from "./sceneMath";
import { computeTod, DEPTH_IMAGE, TOD_IMAGE, todWeights, type Tod, type TodState } from "./timeOfDay";

export interface HeroEngineOptions {
  root: HTMLElement;
  glCanvas: HTMLCanvasElement;
  fxCanvas: HTMLCanvasElement;
  todOverride: Tod | null;
  parallax?: Partial<ParallaxParams>;
  /** First WebGL frame is on screen: fade the canvas in. */
  onGlReady(): void;
  /** WebGL failed or was lost: show the static image. */
  onGlFail(reason: string): void;
  /** The dominant time of day changed (text treatment, static image). */
  onTodChange(tod: Tod): void;
}

const GL_DPR_CAP = 2;
const FX_DPR_CAP = 1.5;
const IDLE_AFTER_MS = 2500;
const SMOOTHING = 0.06; // per 60 Hz frame, as in the prototype
const SCROLL_DRIFT = 0.45;
const TOD_TICK_MS = 30_000;
const PREFETCH_MINUTES = 45;

function loadImage(src: string): Promise<HTMLImageElement> {
  const img = new Image();
  img.decoding = "async";
  img.src = src;
  return img.decode().then(
    () => img,
    () =>
      new Promise<HTMLImageElement>((res, rej) => {
        if (img.complete && img.naturalWidth) return res(img);
        img.onload = () => res(img);
        img.onerror = () => rej(new Error(`failed to load ${src}`));
      }),
  );
}

export class HeroEngine {
  readonly parallax: ParallaxParams;
  private o: HeroEngineOptions;
  private renderer: DepthParallaxRenderer | null = null;
  private glReady = false;
  private fx: CanvasRenderingContext2D | null;
  private effects: Effect[];
  private tod: TodState;
  private dominant: Tod;
  private images = new Map<string, Promise<HTMLImageElement>>();

  private touch: boolean;
  private target: [number, number] = [0, 0];
  private cur: [number, number] = [0, 0];
  private lastMove = -Infinity;
  private scrollDrift = 0;

  private w = 1;
  private h = 1;
  private glDpr = 1;
  private glDprLimit = GL_DPR_CAP;
  private fxDpr = 1;
  private onScreen = true;
  private raf = 0;
  private last = 0;
  private start = performance.now();
  private slowFrames = 0;
  private frames = 0;
  private disposed = false;
  private cleanups: (() => void)[] = [];

  constructor(o: HeroEngineOptions) {
    this.o = o;
    this.parallax = { ...DEFAULT_PARALLAX, ...o.parallax };
    this.touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    this.tod = computeTod(new Date(), o.todOverride);
    this.dominant = this.tod.mix > 0.5 ? this.tod.b : this.tod.a;

    try {
      this.renderer = new DepthParallaxRenderer(o.glCanvas);
    } catch (e) {
      o.onGlFail(e instanceof Error ? e.message : "WebGL init failed");
    }
    this.fx = o.fxCanvas.getContext("2d");
    this.effects = this.fx ? createEffects() : [];

    this.listen(o.glCanvas, "webglcontextlost", (e) => {
      e.preventDefault();
      this.failGl("WebGL context lost");
    });
    if (!this.touch) {
      this.listen(window, "pointermove", (e) => {
        const pe = e as PointerEvent;
        if (pe.pointerType === "touch") return;
        this.target = [(pe.clientX / window.innerWidth) * 2 - 1, -((pe.clientY / window.innerHeight) * 2 - 1)];
        this.lastMove = performance.now();
      });
      this.listen(window, "scroll", () => this.onScroll());
    }
    this.listen(document, "visibilitychange", () => this.kick());

    const ro = new ResizeObserver(() => this.resize());
    ro.observe(o.root);
    this.cleanups.push(() => ro.disconnect());
    const io = new IntersectionObserver((entries) => {
      this.onScreen = entries[entries.length - 1].isIntersecting;
      this.kick();
    });
    io.observe(o.root);
    this.cleanups.push(() => io.disconnect());
    const timer = window.setInterval(() => this.tickTod(), TOD_TICK_MS);
    this.cleanups.push(() => window.clearInterval(timer));

    this.resize();
    this.syncTextures();
    this.kick();
  }

  private listen(t: EventTarget, type: string, fn: (e: Event) => void) {
    t.addEventListener(type, fn, { passive: type !== "webglcontextlost" });
    this.cleanups.push(() => t.removeEventListener(type, fn));
  }

  private onScroll() {
    const p = Math.min(1, Math.max(0, window.scrollY / Math.max(1, this.h)));
    this.scrollDrift = -p * SCROLL_DRIFT;
  }

  private failGl(reason: string) {
    if (!this.renderer) return;
    this.renderer = null;
    this.glReady = false;
    this.o.onGlFail(reason);
  }

  private image(src: string) {
    let p = this.images.get(src);
    if (!p) {
      p = loadImage(src);
      this.images.set(src, p);
    }
    return p;
  }

  /** Upload what the current time needs; prefetch the next window shortly before it starts. */
  private syncTextures() {
    const r = this.renderer;
    if (!r) return;
    const needed = Array.from(new Set([this.tod.a, this.tod.b]));
    const keep = new Set<string>(needed);
    if (this.tod.minutesLeft < PREFETCH_MINUTES) {
      keep.add(this.tod.next);
      void this.image(TOD_IMAGE[this.tod.next]).catch(() => undefined);
    }
    r.retainOnly(keep);

    const jobs: Promise<void>[] = needed
      .filter((k) => !r.hasImage(k))
      .map((k) => this.image(TOD_IMAGE[k]).then((img) => this.renderer?.setImage(k, img)));
    if (!this.glReady) {
      jobs.push(this.image(DEPTH_IMAGE).then((img) => this.renderer?.setDepth(img)));
    }
    Promise.all(jobs).then(
      () => {
        if (this.disposed || !this.renderer || this.glReady) return;
        this.glReady = true;
        this.renderFrame(performance.now());
        // Let the first frame reach the screen before revealing the canvas.
        requestAnimationFrame(() => !this.disposed && this.glReady && this.o.onGlReady());
      },
      (e) => this.failGl(e instanceof Error ? e.message : "texture load failed"),
    );
  }

  private tickTod() {
    const prev = this.tod;
    this.tod = computeTod(new Date(), this.o.todOverride);
    if (prev.a !== this.tod.a || prev.b !== this.tod.b || (prev.minutesLeft >= PREFETCH_MINUTES) !== (this.tod.minutesLeft >= PREFETCH_MINUTES)) {
      this.syncTextures();
    }
    const dominant = this.tod.mix > 0.5 ? this.tod.b : this.tod.a;
    if (dominant !== this.dominant) {
      this.dominant = dominant;
      this.o.onTodChange(dominant);
    }
  }

  private resize() {
    const rect = this.o.root.getBoundingClientRect();
    this.w = Math.max(1, rect.width);
    this.h = Math.max(1, rect.height);
    const dpr = window.devicePixelRatio || 1;
    this.glDpr = Math.min(dpr, this.glDprLimit);
    this.fxDpr = Math.min(dpr, FX_DPR_CAP);
    this.renderer?.resize(this.w, this.h, this.glDpr);
    if (!this.touch) this.onScroll(); // drift is relative to the hero height
    const c = this.o.fxCanvas;
    const fw = Math.round(this.w * this.fxDpr);
    const fh = Math.round(this.h * this.fxDpr);
    if (c.width !== fw || c.height !== fh) {
      c.width = fw;
      c.height = fh;
    }
    if (this.glReady) this.renderFrame(performance.now());
  }

  private running() {
    return !this.disposed && this.onScreen && !document.hidden;
  }

  private kick() {
    if (this.running() && !this.raf) {
      this.last = performance.now();
      this.raf = requestAnimationFrame(this.loop);
    }
  }

  private loop = (now: number) => {
    this.raf = 0;
    if (!this.running()) return;
    this.renderFrame(now);
    this.adaptQuality(now);
    this.raf = requestAnimationFrame(this.loop);
  };

  /** Drop the WebGL resolution once if the device clearly can't keep up. */
  private adaptQuality(now: number) {
    const dt = now - this.last;
    this.last = now;
    if (this.slowFrames < 0 || this.glDpr <= 1) return;
    this.frames++;
    if (this.frames < 30) return;
    if (dt > 34) this.slowFrames++;
    if (this.frames === 150) {
      if (this.slowFrames > 60) {
        this.glDprLimit = Math.max(1, this.glDpr * 0.66);
        this.glDpr = this.glDprLimit;
        this.renderer?.resize(this.w, this.h, this.glDpr);
      }
      this.slowFrames = -1; // decided; never re-evaluate
    }
  }

  private prevNow = 0;

  private renderFrame(now: number) {
    const dt = Math.min(0.1, Math.max(0, (now - (this.prevNow || now)) / 1000));
    this.prevNow = now;
    const t = (now - this.start) / 1000;

    let tx: number;
    let ty: number;
    if (this.touch || now - this.lastMove > IDLE_AFTER_MS) {
      tx = Math.sin(now * 0.0003) * 0.6;
      ty = Math.cos(now * 0.00021) * 0.3;
    } else {
      [tx, ty] = this.target;
    }
    ty += this.scrollDrift;
    tx = Math.max(-1, Math.min(1, tx));
    ty = Math.max(-1, Math.min(1, ty));
    const a = 1 - Math.pow(1 - SMOOTHING, dt * 60);
    this.cur[0] += (tx - this.cur[0]) * a;
    this.cur[1] += (ty - this.cur[1]) * a;

    // Mix updates continuously between the 30 s ticks.
    if (!this.tod.overridden && this.tod.mix > 0) {
      const s = computeTod(new Date(), null);
      if (s.a === this.tod.a && s.b === this.tod.b) this.tod.mix = s.mix;
    }
    const weights = todWeights(this.tod);

    const scale = coverScale(this.w, this.h, zoomFor(this.parallax.strength));
    // Without WebGL the static image doesn't move, so neither should the effects.
    const pointer: [number, number] = this.glReady ? [this.cur[0], this.cur[1]] : [0, 0];
    const view: View = { w: this.w, h: this.h, scale, pointer, parallax: this.parallax };

    if (this.renderer && this.glReady) {
      this.renderer.render({
        pointer,
        scale,
        parallax: this.parallax,
        a: this.tod.a,
        b: this.tod.b,
        mix: this.tod.mix,
        twinkle: starTwinkleWeight(weights),
        time: t,
      });
    }

    const ctx = this.fx;
    if (ctx) {
      ctx.setTransform(this.fxDpr, 0, 0, this.fxDpr, 0, 0);
      ctx.clearRect(0, 0, this.w, this.h);
      const frame: FxFrame = {
        ctx,
        t,
        dt,
        view,
        weights,
        project: (u, v, d) => project(u, v, d, view),
        compact: this.w < 700,
        dpr: this.fxDpr,
      };
      for (const e of this.effects) e.draw(frame);
    }
  }

  dispose() {
    this.disposed = true;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.cleanups.forEach((c) => c());
    this.cleanups = [];
    this.effects.forEach((e) => e.dispose?.());
    this.renderer?.dispose();
    this.renderer = null;
    this.fx?.clearRect(0, 0, this.o.fxCanvas.width, this.o.fxCanvas.height);
  }
}
