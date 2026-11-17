import { createFireflies } from "./fireflies";
import { createMist } from "./mist";
import { createPetals } from "./petals";
import { createSunFlare } from "./sunFlare";
import type { Effect } from "./types";

export { starTwinkleWeight } from "./starTwinkle";
export type { Effect, FxFrame } from "./types";

/** 2D overlay effects, back to front. Star twinkle lives in the WebGL shader. */
export function createEffects(): Effect[] {
  return [createMist(), createSunFlare(), createFireflies(), createPetals()];
}
