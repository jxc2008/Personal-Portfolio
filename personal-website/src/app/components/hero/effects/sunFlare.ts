import { SUN_UV } from "../sceneMath";
import { clamp01, type Effect, type FxFrame } from "./types";

/**
 * Golden hour only: a soft bloom, a long anamorphic streak and a few faint
 * rays anchored on the sun at the right horizon, plus pale ghosts along the
 * sun→centre axis. All additive and low alpha, like a film composite.
 */

const GHOSTS = [
  // k: position along sun→centre axis (1 = centre); r: radius vs min(w, h)
  { k: 0.55, r: 0.035, rgb: "255,214,160", a: 0.07, ring: false },
  { k: 1.25, r: 0.06, rgb: "160,220,255", a: 0.045, ring: true },
  { k: 1.55, r: 0.022, rgb: "255,180,200", a: 0.07, ring: false },
  { k: 1.9, r: 0.09, rgb: "200,180,255", a: 0.03, ring: true },
];

const RAYS = [
  { angle: 2.75, width: 0.05, len: 0.85, a: 0.05 },
  { angle: 3.05, width: 0.035, len: 1.1, a: 0.045 },
  { angle: 3.4, width: 0.06, len: 0.7, a: 0.04 },
  { angle: 3.75, width: 0.03, len: 0.9, a: 0.035 },
  { angle: 2.35, width: 0.04, len: 0.6, a: 0.03 },
];

function radial(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  stops: [number, string][],
) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  stops.forEach(([o, c]) => g.addColorStop(o, c));
  ctx.fillStyle = g;
  ctx.fillRect(x - r, y - r, r * 2, r * 2);
}

export function createSunFlare(): Effect {
  return {
    name: "sunFlare",
    draw(f: FxFrame) {
      const w = f.weights.golden;
      if (w < 0.01) return;
      const { ctx, view, t } = f;
      const [sx, sy] = f.project(SUN_UV[0], SUN_UV[1], 0);
      const m = Math.min(view.w, view.h);
      const breathe = 1 + 0.05 * Math.sin(t * 0.4) + 0.03 * Math.sin(t * 0.93 + 1);

      // How far the sun is outside the frame (phones in portrait crop it out).
      const outside = Math.max(0, sx - view.w, -sx, sy - view.h, -sy) / m;
      const presence = 1 - clamp01(outside / 0.6);

      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      // Wide warm bloom
      ctx.globalAlpha = w * 0.75;
      radial(ctx, sx, sy, m * 0.9 * breathe, [
        [0, "rgba(255,226,170,0.30)"],
        [0.25, "rgba(255,196,130,0.12)"],
        [1, "rgba(255,170,110,0)"],
      ]);
      // Core
      radial(ctx, sx, sy, m * 0.09, [
        [0, "rgba(255,250,232,0.55)"],
        [1, "rgba(255,236,200,0)"],
      ]);

      // Anamorphic streak: a radial gradient squashed vertically
      ctx.save();
      ctx.translate(sx, sy);
      ctx.scale(1, 0.016);
      ctx.globalAlpha = w * presence * 0.9;
      radial(ctx, 0, 0, view.w * 0.75, [
        [0, "rgba(255,236,205,0.35)"],
        [0.35, "rgba(255,210,170,0.10)"],
        [1, "rgba(255,200,160,0)"],
      ]);
      ctx.restore();

      // Slowly turning soft rays
      const spin = t * 0.012;
      RAYS.forEach((r) => {
        const a0 = r.angle + spin + 0.04 * Math.sin(t * 0.2 + r.angle);
        const len = m * r.len * 1.4;
        const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, len);
        g.addColorStop(0, `rgba(255,232,190,${r.a})`);
        g.addColorStop(1, "rgba(255,220,180,0)");
        ctx.globalAlpha = w * (0.7 + 0.3 * Math.sin(t * 0.3 + r.angle * 3));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.arc(sx, sy, len, a0 - r.width / 2, a0 + r.width / 2);
        ctx.closePath();
        ctx.fill();
      });

      // Ghosts along the sun → centre axis
      const cx = view.w / 2;
      const cy = view.h / 2;
      ctx.globalAlpha = w * presence;
      GHOSTS.forEach((gh) => {
        const gx = sx + (cx - sx) * gh.k;
        const gy = sy + (cy - sy) * gh.k;
        const r = m * gh.r;
        radial(
          ctx,
          gx,
          gy,
          r,
          gh.ring
            ? [
                [0, `rgba(${gh.rgb},0)`],
                [0.7, `rgba(${gh.rgb},${gh.a * 0.4})`],
                [0.88, `rgba(${gh.rgb},${gh.a})`],
                [1, `rgba(${gh.rgb},0)`],
              ]
            : [
                [0, `rgba(${gh.rgb},${gh.a})`],
                [1, `rgba(${gh.rgb},0)`],
              ],
        );
      });

      ctx.restore();
    },
  };
}
