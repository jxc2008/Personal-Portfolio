/** Source images are 2912×1632 and pixel-aligned across every time of day. */
export const IMAGE_W = 2912;
export const IMAGE_H = 1632;
export const IMAGE_ASPECT = IMAGE_W / IMAGE_H;

export interface ParallaxParams {
  /** UV displacement per unit of pointer offset. */
  strength: number;
  /** Depth that stays still (0 = far, 1 = near). */
  focus: number;
  /** Exponent applied to depth; < 1 gives mid-depths more motion. */
  gamma: number;
}

// Spec default was ~0.03; 0.02 chosen after a tearing sweep around the foreground reeds
// (0.03 / 0.022 / 0.018 / 0.015 with the pointer at both extremes). See STATUS.md.
export const DEFAULT_PARALLAX: ParallaxParams = { strength: 0.02, focus: 0.2, gamma: 1 };

/** Dev-only tuning via ?strength=0.02&focus=0.2 (clamped to sane ranges). */
export function parseParallaxOverride(search: string): Partial<ParallaxParams> {
  const q = new URLSearchParams(search);
  const out: Partial<ParallaxParams> = {};
  const s = Number(q.get("strength"));
  const f = Number(q.get("focus"));
  if (q.has("strength") && Number.isFinite(s)) out.strength = Math.min(0.08, Math.max(0, s));
  if (q.has("focus") && Number.isFinite(f)) out.focus = Math.min(1, Math.max(0, f));
  return out;
}

/** Zoom so that the largest offset never samples past the image edge (from the prototype). */
export function zoomFor(strength: number): number {
  return 1 - strength * 2.2;
}

/** UV scale for cover-fitting the image into the viewport, zoom included. */
export function coverScale(viewW: number, viewH: number, zoom: number): [number, number] {
  const va = viewW / viewH;
  const s: [number, number] = va > IMAGE_ASPECT ? [1, IMAGE_ASPECT / va] : [va / IMAGE_ASPECT, 1];
  return [s[0] * zoom, s[1] * zoom];
}

export interface View {
  w: number;
  h: number;
  scale: [number, number];
  /** Smoothed pointer, x right / y up, roughly in [-1, 1]. */
  pointer: [number, number];
  parallax: ParallaxParams;
}

/** UV-space displacement the shader applies at a given depth (texture space, y up). */
export function depthOffset(depth: number, v: View): [number, number] {
  const k = (Math.pow(depth, v.parallax.gamma) - v.parallax.focus) * v.parallax.strength;
  return [v.pointer[0] * k, v.pointer[1] * k];
}

/**
 * Where an image point (u right, v down, both 0..1) at the given depth lands on
 * screen in CSS pixels, matching the shader's cover-fit and parallax.
 */
export function project(u: number, vDown: number, depth: number, view: View): [number, number] {
  const [ox, oy] = depthOffset(depth, view);
  const sx = (u - ox - 0.5) / view.scale[0] + 0.5;
  const sy = (1 - vDown - oy - 0.5) / view.scale[1] + 0.5;
  return [sx * view.w, (1 - sy) * view.h];
}

/** Visible range of image u (left→right) and v (top→bottom) at rest. */
export function visibleRange(view: View): { u: [number, number]; v: [number, number] } {
  return {
    u: [0.5 - view.scale[0] / 2, 0.5 + view.scale[0] / 2],
    v: [0.5 - view.scale[1] / 2, 0.5 + view.scale[1] / 2],
  };
}
