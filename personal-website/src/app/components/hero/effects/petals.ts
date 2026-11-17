import { depthOffset } from "../sceneMath";
import { makeCanvas, mulberry32, type Effect, type FxFrame } from "./types";

/**
 * Day and golden hour: a few red petals drifting down in front of the scene.
 * Three depth layers: far petals are small and sharp, near ones larger,
 * slightly blurred and a little faster. Each tumbles (rotation plus a flip)
 * at its own rate.
 */

const MAX = 10;
const MAX_COMPACT = 5;

const LAYERS = [
  { size: 8, speed: 0.7, blur: 0, alpha: 0.8, depth: 0.85 },
  { size: 12, speed: 1, blur: 0.6, alpha: 0.88, depth: 1 },
  { size: 19, speed: 1.35, blur: 1.8, alpha: 0.82, depth: 1.15 },
];
const LAYER_ODDS = [0.45, 0.4, 0.15];
const COLOURS = [
  ["#b3162b", "#e24a5a"],
  ["#c42736", "#f07a72"],
  ["#9e1424", "#d63b4b"],
];

interface Petal {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  spin: number;
  flip: number;
  flipRate: number;
  swayAmp: number;
  swayRate: number;
  swayPhase: number;
  layer: number;
  sprite: number;
  age: number;
}

const SPRITE = 48;

function makeSprites(): HTMLCanvasElement[] {
  const out: HTMLCanvasElement[] = [];
  LAYERS.forEach((layer) => {
    COLOURS.forEach(([base, tip]) => {
      const c = makeCanvas(SPRITE, SPRITE);
      const g = c.getContext("2d")!;
      const r = SPRITE * 0.3;
      g.translate(SPRITE / 2, SPRITE / 2);
      if (layer.blur > 0) g.filter = `blur(${layer.blur * 1.5}px)`;
      const grad = g.createLinearGradient(0, -r, 0, r);
      grad.addColorStop(0, tip);
      grad.addColorStop(0.55, base);
      grad.addColorStop(1, base);
      g.fillStyle = grad;
      // Teardrop petal with a small notch at the outer end
      g.beginPath();
      g.moveTo(0, r);
      g.bezierCurveTo(-r * 0.75, r * 0.45, -r * 0.7, -r * 0.75, -r * 0.18, -r);
      g.lineTo(0, -r * 0.82);
      g.lineTo(r * 0.18, -r);
      g.bezierCurveTo(r * 0.7, -r * 0.75, r * 0.75, r * 0.45, 0, r);
      g.fill();
      out.push(c);
    });
  });
  return out;
}

export function createPetals(): Effect {
  const sprites = makeSprites();
  const rnd = mulberry32(1234);
  let petals: Petal[] = [];
  let lastW = 0;

  function pickLayer() {
    const r = rnd();
    return r < LAYER_ODDS[0] ? 0 : r < LAYER_ODDS[0] + LAYER_ODDS[1] ? 1 : 2;
  }

  function spawn(w: number, h: number, k: number, anywhere: boolean): Petal {
    const layer = pickLayer();
    const L = LAYERS[layer];
    let x: number;
    let y: number;
    if (anywhere) {
      x = rnd() * w;
      y = rnd() * h;
    } else if (rnd() < 0.6) {
      x = rnd() * w * 0.9 - w * 0.1; // from the top
      y = -30;
    } else {
      x = -30; // from the left
      y = rnd() * h * 0.6;
    }
    return {
      x,
      y,
      vx: (14 + rnd() * 16) * L.speed * k,
      vy: (12 + rnd() * 14) * L.speed * k,
      rot: rnd() * Math.PI * 2,
      spin: (0.25 + rnd() * 0.9) * (rnd() < 0.5 ? -1 : 1),
      flip: rnd() * Math.PI * 2,
      flipRate: 0.6 + rnd() * 1.6,
      swayAmp: (8 + rnd() * 22) * k,
      swayRate: 0.18 + rnd() * 0.35,
      swayPhase: rnd() * Math.PI * 2,
      layer,
      sprite: layer * COLOURS.length + Math.floor(rnd() * COLOURS.length),
      age: anywhere ? 0 : 2,
    };
  }

  return {
    name: "petals",
    draw(f: FxFrame) {
      const w = f.weights.day + f.weights.golden;
      if (w < 0.01) return;
      const { ctx, view, dt, t } = f;
      const k = Math.min(view.w, view.h) / 900;
      const max = f.compact ? MAX_COMPACT : MAX;
      if (Math.abs(view.w - lastW) > 80 || petals.length !== max) {
        lastW = view.w;
        petals = Array.from({ length: max }, () => spawn(view.w, view.h, k, true));
      }

      ctx.save();
      for (let i = 0; i < petals.length; i++) {
        let p = petals[i];
        p.age += dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rot += p.spin * dt;
        p.flip += p.flipRate * dt;
        if (p.x > view.w + 40 || p.y > view.h + 40) {
          p = petals[i] = spawn(view.w, view.h, k, false);
          p.age = 0;
        }
        const L = LAYERS[p.layer];
        const [ox, oy] = depthOffset(L.depth, view);
        // UV offset → pixels (texture y is up, screen y is down)
        const px = p.x + Math.sin(t * p.swayRate + p.swayPhase) * p.swayAmp - (ox / view.scale[0]) * view.w;
        const py = p.y + (oy / view.scale[1]) * view.h;
        const size = L.size * 2.4 * Math.max(0.75, k);
        const fade = Math.min(1, p.age / 1.5);
        const flipS = Math.cos(p.flip);

        ctx.globalAlpha = w * L.alpha * fade * (0.75 + 0.25 * Math.abs(flipS));
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.translate(px * f.dpr, py * f.dpr);
        ctx.rotate(p.rot);
        ctx.scale(f.dpr, f.dpr * Math.max(0.12, Math.abs(flipS)));
        ctx.drawImage(sprites[p.sprite], -size / 2, -size / 2, size, size);
      }
      ctx.restore();
    },
  };
}
