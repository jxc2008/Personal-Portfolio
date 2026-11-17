import type { Tod } from "../timeOfDay";

/**
 * Night star twinkle. Runs inside the parallax fragment shader so it twinkles
 * the stars that are actually painted in the sky, rather than drawing new ones.
 * Stars are found by local contrast (a pixel much brighter than its neighbours),
 * which leaves the smooth moonlit clouds alone.
 *
 * Requires from the host shader: `scene(vec2)`, `uTexel`, `uTime`.
 */
export const STAR_TWINKLE_GLSL = /* glsl */ `
uniform float uTwinkle;

float twHash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec3 applyTwinkle(vec3 col, vec2 uv, float depth) {
  float sky = 1.0 - smoothstep(0.02, 0.10, depth);
  if (sky <= 0.0) return col;
  vec2 t = uTexel * 2.0;
  vec3 bg = 0.25 * (scene(uv + vec2(t.x, 0.0)) + scene(uv - vec2(t.x, 0.0)) +
                    scene(uv + vec2(0.0, t.y)) + scene(uv - vec2(0.0, t.y)));
  vec3 lw = vec3(0.299, 0.587, 0.114);
  float star = smoothstep(0.05, 0.20, dot(col, lw) - dot(bg, lw)) * sky;
  if (star <= 0.0) return col;
  vec2 cell = floor(uv / (uTexel * 4.0));
  float phase = twHash(cell) * 6.2831;
  float speed = 0.5 + 1.4 * twHash(cell + 17.0);
  float tw = 0.5 + 0.5 * sin(uTime * speed + phase);
  float gain = mix(0.45, 1.3, tw * tw);
  vec3 twinkled = bg + (col - bg) * gain;
  return mix(col, clamp(twinkled, 0.0, 1.0), star * uTwinkle);
}
`;

export function starTwinkleWeight(w: Record<Tod, number>): number {
  return w.night;
}
