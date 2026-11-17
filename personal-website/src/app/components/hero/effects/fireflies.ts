import { visibleRange } from "../sceneMath";
import { makeCanvas, mulberry32, type Effect, type FxFrame } from "./types";

/**
 * Night only: a handful of fireflies wandering among the reeds at either edge
 * and over the near grass, each with its own slow blink.
 */

const MAX = 14;
const MAX_COMPACT = 8;
const DEPTH = 0.82;

interface Fly {
  /** Anchor in image space (u right, v down). */
  u: number;
  v: number;
  f1: number;
  f2: number;
  p1: number;
  p2: number;
  amp: number;
  period: number;
  offset: number;
  size: number;
}

function makeSprite(): HTMLCanvasElement {
  const s = 64;
  const c = makeCanvas(s, s);
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  grad.addColorStop(0, "rgba(250,255,210,1)");
  grad.addColorStop(0.12, "rgba(226,255,150,0.9)");
  grad.addColorStop(0.35, "rgba(190,240,110,0.25)");
  grad.addColorStop(1, "rgba(160,220,90,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, s, s);
  return c;
}

/** Soft blink: mostly dim, a smooth glow for ~35% of each cycle. */
function blink(phase: number): number {
  const on = 0.35;
  if (phase > on) return 0.06;
  const s = Math.sin((Math.PI * phase) / on);
  return 0.06 + 0.94 * s * s;
}

export function createFireflies(): Effect {
  const sprite = makeSprite();
  const rnd = mulberry32(42);
  let flies: Fly[] = [];
  let layoutKey = "";

  function layout(f: FxFrame) {
    const vis = visibleRange(f.view);
    const n = f.compact ? MAX_COMPACT : MAX;
    const lo = vis.u[0] + 0.02;
    const hi = vis.u[1] - 0.02;
    flies = [];
    for (let i = 0; i < n; i++) {
      const r = rnd();
      let u: number;
      let v: number;
      if (r < 0.42) {
        u = 0.02 + rnd() * 0.2; // left reeds
        v = 0.6 + rnd() * 0.3;
      } else if (r < 0.84) {
        u = 0.8 + rnd() * 0.18; // right reeds
        v = 0.6 + rnd() * 0.3;
      } else {
        u = 0.25 + rnd() * 0.5; // near grass
        v = 0.84 + rnd() * 0.1;
      }
      // Phones crop the reeds out; keep every firefly inside the frame.
      if (u < lo || u > hi) {
        u = lo + rnd() * (hi - lo);
        v = 0.7 + rnd() * 0.24;
      }
      flies.push({
        u,
        v,
        f1: 0.08 + rnd() * 0.12,
        f2: 0.15 + rnd() * 0.2,
        p1: rnd() * 6.28,
        p2: rnd() * 6.28,
        amp: 0.006 + rnd() * 0.01,
        period: 3.5 + rnd() * 4,
        offset: rnd() * 10,
        size: 12 + rnd() * 12,
      });
    }
  }

  return {
    name: "fireflies",
    draw(f: FxFrame) {
      const w = f.weights.night;
      if (w < 0.01) return;
      const key = `${f.compact}|${f.view.scale[0].toFixed(3)}`;
      if (key !== layoutKey) {
        layoutKey = key;
        layout(f);
      }
      const { ctx, t } = f;
      const k = Math.min(f.view.w, f.view.h) / 900;
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (const fl of flies) {
        const u = fl.u + fl.amp * (Math.sin(t * fl.f1 + fl.p1) + 0.5 * Math.sin(t * fl.f2 * 1.7 + fl.p2));
        const v = fl.v + fl.amp * 0.6 * (Math.cos(t * fl.f2 + fl.p2) + 0.4 * Math.sin(t * fl.f1 * 2.3 + fl.p1));
        const [x, y] = f.project(u, v, DEPTH);
        const b = blink(((t + fl.offset) / fl.period) % 1);
        const s = fl.size * Math.max(0.7, k) * (0.85 + 0.25 * b);
        ctx.globalAlpha = w * b * 0.9;
        ctx.drawImage(sprite, x - s / 2, y - s / 2, s, s);
      }
      ctx.restore();
    },
  };
}
