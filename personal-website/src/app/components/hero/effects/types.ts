import type { Tod } from "../timeOfDay";
import type { View } from "../sceneMath";

export interface FxFrame {
  /** Already scaled so that 1 unit = 1 CSS pixel. */
  ctx: CanvasRenderingContext2D;
  /** Seconds since the engine started, and seconds since the previous frame (clamped). */
  t: number;
  dt: number;
  view: View;
  weights: Record<Tod, number>;
  /** Image point (u right, v down) at a depth → CSS pixels, matching the shader. */
  project(u: number, v: number, depth: number): [number, number];
  /** Narrow viewport: effects use fewer particles. */
  compact: boolean;
  /** Backing-store pixels per CSS pixel, for effects that set their own transform. */
  dpr: number;
}

export interface Effect {
  readonly name: string;
  draw(f: FxFrame): void;
  dispose?(): void;
}

export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

/** Deterministic PRNG so particle layouts are stable between reloads. */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeCanvas(w: number, h: number): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
}
