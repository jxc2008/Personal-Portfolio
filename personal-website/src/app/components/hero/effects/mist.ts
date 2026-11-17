import type { Tod } from "../timeOfDay";
import { makeCanvas, mulberry32, type Effect, type FxFrame } from "./types";

/**
 * A faint band of mist drifting slowly across the far side of the lake.
 * Two tileable layers at slightly different depths and speeds, tinted per
 * time of day. Active at every time of day.
 */

const TILE_W = 1024;
const TILE_H = 160;

const TINT: Record<Tod, { rgb: [number, number, number]; alpha: number }> = {
  day: { rgb: [236, 242, 255], alpha: 0.16 },
  golden: { rgb: [255, 226, 200], alpha: 0.2 },
  bluehour: { rgb: [196, 204, 248], alpha: 0.2 },
  night: { rgb: [160, 176, 222], alpha: 0.13 },
};

const LAYERS = [
  // v = image row (0 top, 1 bottom) of the band centre; h = band height in image units.
  { v: 0.695, h: 0.075, depth: 0.32, speed: 0.006, seed: 7, alpha: 1 },
  { v: 0.74, h: 0.06, depth: 0.42, speed: -0.004, seed: 19, alpha: 0.7 },
];

function makeTile(seed: number): HTMLCanvasElement {
  const c = makeCanvas(TILE_W, TILE_H);
  const g = c.getContext("2d")!;
  const rnd = mulberry32(seed);
  for (let i = 0; i < 46; i++) {
    const x = rnd() * TILE_W;
    const y = TILE_H * (0.5 + (rnd() - 0.5) * 0.35);
    const rx = 60 + rnd() * 160;
    const ry = 14 + rnd() * 26;
    const a = 0.12 + rnd() * 0.22;
    for (const dx of [-TILE_W, 0, TILE_W]) {
      g.save();
      g.translate(x + dx, y);
      g.scale(rx / ry, 1);
      const grad = g.createRadialGradient(0, 0, 0, 0, 0, ry);
      grad.addColorStop(0, `rgba(255,255,255,${a})`);
      grad.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = grad;
      g.fillRect(-ry, -ry, ry * 2, ry * 2);
      g.restore();
    }
  }
  // Feather the top and bottom so the band has no hard edges.
  g.globalCompositeOperation = "destination-in";
  const fade = g.createLinearGradient(0, 0, 0, TILE_H);
  fade.addColorStop(0, "rgba(0,0,0,0)");
  fade.addColorStop(0.4, "rgba(0,0,0,1)");
  fade.addColorStop(0.65, "rgba(0,0,0,1)");
  fade.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = fade;
  g.fillRect(0, 0, TILE_W, TILE_H);
  return c;
}

export function createMist(): Effect {
  const tiles = LAYERS.map((l) => makeTile(l.seed));
  const tinted = LAYERS.map(() => makeCanvas(TILE_W, TILE_H));
  let tintKey = "";

  function retint(rgb: [number, number, number]) {
    const key = rgb.map((x) => Math.round(x / 4)).join(",");
    if (key === tintKey) return;
    tintKey = key;
    tinted.forEach((c, i) => {
      const g = c.getContext("2d")!;
      g.globalCompositeOperation = "copy";
      g.drawImage(tiles[i], 0, 0);
      g.globalCompositeOperation = "source-in";
      g.fillStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
      g.fillRect(0, 0, TILE_W, TILE_H);
    });
  }

  return {
    name: "mist",
    draw(f: FxFrame) {
      const rgb: [number, number, number] = [0, 0, 0];
      let alpha = 0;
      (Object.keys(TINT) as Tod[]).forEach((k) => {
        const w = f.weights[k];
        rgb[0] += TINT[k].rgb[0] * w;
        rgb[1] += TINT[k].rgb[1] * w;
        rgb[2] += TINT[k].rgb[2] * w;
        alpha += TINT[k].alpha * w;
      });
      if (alpha < 0.005) return;
      retint(rgb);

      const { ctx, view } = f;
      ctx.save();
      LAYERS.forEach((l, i) => {
        const [, yTop] = f.project(0.5, l.v - l.h / 2, l.depth);
        const [, yBot] = f.project(0.5, l.v + l.h / 2, l.depth);
        const [xLeft] = f.project(0, l.v, l.depth);
        const [xRight] = f.project(1, l.v, l.depth);
        const bandH = yBot - yTop;
        const tileW = bandH * (TILE_W / TILE_H) * 1.8;
        // Drift in image space so the speed is the same at every viewport size.
        const shift = (((f.t * l.speed * (xRight - xLeft)) % tileW) + tileW) % tileW;
        ctx.globalAlpha = alpha * l.alpha * (0.85 + 0.15 * Math.sin(f.t * 0.05 + i * 2));
        for (let x = xLeft - tileW + shift; x < view.w; x += tileW) {
          ctx.drawImage(tinted[i], x, yTop, tileW, bandH);
        }
      });
      ctx.restore();
    },
  };
}
