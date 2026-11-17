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

// Strength is set from the tearing sweep around the foreground reeds. See STATUS.md.
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

/** Sun position in the golden image (u right, v down). */
export const SUN_UV: [number, number] = [0.91, 0.405];

/** Minimum focal point (image u at the viewport centre) on portrait viewports. */
export const PORTRAIT_FOCAL_U = 0.62;
/** How far inside the right edge (image u) the sun is kept on portrait viewports. */
const SUN_PAD = 0.03;

/** Dev-only: ?focal=0.62 pins the portrait focal point (to compare framings). */
export function parseFocalOverride(search: string): number | null {
  const v = Number(new URLSearchParams(search).get("focal"));
  return new URLSearchParams(search).has("focal") && Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : null;
}

/**
 * Image UV (u right, v down) shown at the centre of the viewport.
 * Landscape: the image centre. Portrait (aspect < 1): shifted right to at least
 * PORTRAIT_FOCAL_U, and further if needed to keep the sun in frame, but never so
 * far that the largest parallax offset could sample past the image's right edge.
 */
export function focalCenter(
  viewW: number,
  viewH: number,
  scale: [number, number],
  p: ParallaxParams,
  override: number | null = null,
): [number, number] {
  if (viewW >= viewH) return [0.5, 0.5];
  const half = scale[0] / 2;
  const edge = p.strength * Math.max(p.focus, 1 - p.focus);
  const want = override ?? Math.max(PORTRAIT_FOCAL_U, SUN_UV[0] + SUN_PAD - half);
  return [Math.min(Math.max(want, half + edge), 1 - half - edge), 0.5];
}

/**
 * CSS object-position x (0..1) that makes an object-fit: cover image, later
 * scaled by 1/zoom about its centre, show image u = centerU at the viewport centre.
 */
export function objectPositionX(viewW: number, viewH: number, centerU: number): number {
  const w0 = viewW / viewH / IMAGE_ASPECT; // visible width fraction at zoom 1
  if (w0 >= 1) return 0.5;
  return Math.min(1, Math.max(0, (centerU - w0 / 2) / (1 - w0)));
}

export interface View {
  w: number;
  h: number;
  scale: [number, number];
  /** Image UV (u right, v down) at the viewport centre. */
  center: [number, number];
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
  const sx = (u - ox - view.center[0]) / view.scale[0] + 0.5;
  const sy = (view.center[1] - vDown - oy) / view.scale[1] + 0.5;
  return [sx * view.w, (1 - sy) * view.h];
}

/** Visible range of image u (left→right) and v (top→bottom) at rest. */
export function visibleRange(view: View): { u: [number, number]; v: [number, number] } {
  return {
    u: [view.center[0] - view.scale[0] / 2, view.center[0] + view.scale[0] / 2],
    v: [view.center[1] - view.scale[1] / 2, view.center[1] + view.scale[1] / 2],
  };
}

/** The static image's object-position x (0..1) for a viewport, matching the shader framing. */
export function staticObjectPositionX(
  viewW: number,
  viewH: number,
  p: ParallaxParams = DEFAULT_PARALLAX,
  override: number | null = null,
): number {
  const scale = coverScale(viewW, viewH, zoomFor(p.strength));
  return objectPositionX(viewW, viewH, focalCenter(viewW, viewH, scale, p, override)[0]);
}

/** Minimum hero height in CSS px (keep in sync with Hero.module.css). */
export const HERO_MIN_H = 520;

/**
 * Inline script that frames the static image before first paint on portrait
 * screens (default parallax params). Mirrors staticObjectPositionX; unit-tested.
 */
export function framingBootstrapSource(imgId: string): string {
  const p = DEFAULT_PARALLAX;
  return (
    `(function(){try{var im=document.getElementById(${JSON.stringify(imgId)});if(!im)return;` +
    `var W=innerWidth,H=Math.max(innerHeight,${HERO_MIN_H});if(W>=H)return;` +
    `var S=${p.strength},F=${p.focus},z=1-S*2.2,w0=W/H/${IMAGE_ASPECT};if(w0>=1)return;` +
    `var half=w0*z/2,e=S*Math.max(F,1-F),` +
    `c=Math.min(Math.max(Math.max(${PORTRAIT_FOCAL_U},${SUN_UV[0]}+${SUN_PAD}-half),half+e),1-half-e),` +
    `x=Math.min(1,Math.max(0,(c-w0/2)/(1-w0)));` +
    `im.style.objectPosition=(x*100).toFixed(3)+"% 50%";}catch(e){}})();`
  );
}
