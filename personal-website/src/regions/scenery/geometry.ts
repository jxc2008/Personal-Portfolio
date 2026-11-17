// Deterministic shapes for the region banners. Same seed, same picture, so the
// server and client render identical SVG.

export const VIEW_W = 1600;
export const VIEW_H = 900;

export function prng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r1 = (x: number) => Math.round(x * 10) / 10;

/** Heights along a ridge by midpoint displacement: 2^depth + 1 points across the width. */
export function ridgeHeights(seed: number, base: number, amp: number, depth = 7, rough = 0.52): number[] {
  const rand = prng(seed);
  const n = 2 ** depth;
  const y = new Array<number>(n + 1);
  y[0] = base + (rand() - 0.5) * amp;
  y[n] = base + (rand() - 0.5) * amp;
  let scale = amp;
  for (let step = n; step > 1; step /= 2) {
    for (let i = step / 2; i < n; i += step) {
      y[i] = (y[i - step / 2] + y[i + step / 2]) / 2 + (rand() - 0.5) * scale;
    }
    scale *= rough;
  }
  return y;
}

/** Ridges run this far past each side so pointer parallax never shows an edge. */
export const OVERSCAN = 48;

function ridgePoints(heights: number[], dy: number, w: number, over: number): string[] {
  const n = heights.length - 1;
  return heights.map((y, i) => `${r1(-over + (i / n) * (w + 2 * over))},${r1(y + dy)}`);
}

/** A closed silhouette from a list of heights, filled down to the bottom edge. */
export function ridgePath(heights: number[], dy = 0, w = VIEW_W, h = VIEW_H, over = OVERSCAN): string {
  return `M${-over},${h} L${ridgePoints(heights, dy, w, over).join(" L")} L${w + over},${h} Z`;
}

/** The ridge's top edge only, for stroked contour lines. */
export function ridgeLine(heights: number[], dy = 0, w = VIEW_W, over = OVERSCAN): string {
  return "M" + ridgePoints(heights, dy, w, over).join(" L");
}

/** Price paths fanning out from one point: Gaussian random walks. */
export function randomWalks(seed: number, count: number, steps: number, x0: number, y0: number, dx: number, sigma: number): string[] {
  const rand = prng(seed);
  const gauss = () => {
    const u = Math.max(rand(), 1e-9);
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rand());
  };
  const out: string[] = [];
  for (let c = 0; c < count; c++) {
    let y = y0;
    const pts = [`${x0},${y0}`];
    for (let s = 1; s <= steps; s++) {
      y += gauss() * sigma;
      pts.push(`${r1(x0 + s * dx)},${r1(y)}`);
    }
    out.push("M" + pts.join(" L"));
  }
  return out;
}

type Vec = [number, number];

/**
 * Three equal masses on the figure-eight orbit (Chenciner & Montgomery), with
 * G = m = 1, integrated by leapfrog. `nudge` shifts body 0's start, which is
 * enough for the orbit to drift apart over a few periods.
 */
export function threeBody(periods: number, nudge = 0, dt = 0.002): Vec[][] {
  const T = 6.32591398;
  const pos: Vec[] = [
    [0.97000436 + nudge, -0.24308753],
    [-0.97000436, 0.24308753],
    [0, 0],
  ];
  const v3: Vec = [-0.93240737, -0.86473146];
  const vel: Vec[] = [
    [-v3[0] / 2, -v3[1] / 2],
    [-v3[0] / 2, -v3[1] / 2],
    [v3[0], v3[1]],
  ];
  const acc = (): Vec[] =>
    pos.map((p, i) => {
      let ax = 0;
      let ay = 0;
      pos.forEach((q, j) => {
        if (i === j) return;
        const dx = q[0] - p[0];
        const dy = q[1] - p[1];
        const r3 = Math.pow(dx * dx + dy * dy + 1e-6, 1.5);
        ax += dx / r3;
        ay += dy / r3;
      });
      return [ax, ay];
    });
  const steps = Math.round((periods * T) / dt);
  const trails: Vec[][] = [[], [], []];
  let a = acc();
  for (let s = 0; s <= steps; s++) {
    if (s % 8 === 0) pos.forEach((p, i) => trails[i].push([p[0], p[1]]));
    for (let i = 0; i < 3; i++) {
      vel[i][0] += (a[i][0] * dt) / 2;
      vel[i][1] += (a[i][1] * dt) / 2;
      pos[i][0] += vel[i][0] * dt;
      pos[i][1] += vel[i][1] * dt;
    }
    a = acc();
    for (let i = 0; i < 3; i++) {
      vel[i][0] += (a[i][0] * dt) / 2;
      vel[i][1] += (a[i][1] * dt) / 2;
    }
  }
  return trails;
}

export function polyline(points: Vec[], cx: number, cy: number, scale: number): string {
  return "M" + points.map(([x, y]) => `${r1(cx + x * scale)},${r1(cy - y * scale)}`).join(" L");
}
