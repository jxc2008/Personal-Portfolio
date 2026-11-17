export type Tod = "day" | "golden" | "bluehour" | "night";

export const TODS: readonly Tod[] = ["day", "golden", "bluehour", "night"];

export const TOD_IMAGE: Record<Tod, string> = {
  day: "/hero/hero-day.webp",
  golden: "/hero/hero-golden.webp",
  bluehour: "/hero/hero-bluehour.webp",
  night: "/hero/hero-night.webp",
};

export const DEPTH_IMAGE = "/hero/hero-depth.webp";

export const TOD_ALT: Record<Tod, string> = {
  day: "Painted landscape of a still lake ringed by autumn trees under tall white clouds and a bright afternoon sky, with reeds and wildflowers in the foreground.",
  golden:
    "Painted landscape of a still lake ringed by autumn trees, lit by a low golden sun at the right horizon, with pink-gold clouds and reeds in the foreground.",
  bluehour:
    "Painted landscape of a still lake ringed by darkening trees at dusk, with lavender clouds and a last orange glow along the horizon.",
  night:
    "Painted landscape of a still lake at night under the Milky Way, with moonlit clouds, dark trees and reeds in the foreground.",
};

/** Minutes after local midnight where each window starts, in order, beginning at 05:30. */
export const SCHEDULE: readonly (readonly [number, Tod])[] = [
  [330, "bluehour"], // 05:30
  [390, "golden"], // 06:30
  [480, "day"], // 08:00
  [990, "golden"], // 16:30
  [1110, "bluehour"], // 18:30
  [1200, "night"], // 20:00 → 05:30 next day
];

const DAY = 1440;
export const CROSSFADE_MINUTES = 20;

export interface TodState {
  /** Image for the current window. */
  a: Tod;
  /** Image being faded towards (equals `a` outside a crossfade). */
  b: Tod;
  /** 0 → only `a`, 1 → only `b`. */
  mix: number;
  /** The window that follows the current one (for prefetching). */
  next: Tod;
  /** Minutes until the current window ends. */
  minutesLeft: number;
  /** True when forced via ?tod=. */
  overridden: boolean;
}

export function parseTodOverride(search: string): Tod | null {
  const m = /[?&]tod=(day|golden|bluehour|night)(?:&|$)/.exec(search);
  return m ? (m[1] as Tod) : null;
}

export function computeTod(date: Date, override: Tod | null = null): TodState {
  if (override) {
    return { a: override, b: override, mix: 0, next: override, minutesLeft: Infinity, overridden: true };
  }
  let m = date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60;
  if (m < SCHEDULE[0][0]) m += DAY;

  let i = SCHEDULE.length - 1;
  for (let k = 0; k < SCHEDULE.length; k++) if (m >= SCHEDULE[k][0]) i = k;

  const a = SCHEDULE[i][1];
  const nextIdx = (i + 1) % SCHEDULE.length;
  const end = nextIdx === 0 ? SCHEDULE[0][0] + DAY : SCHEDULE[nextIdx][0];
  const next = SCHEDULE[nextIdx][1];
  const minutesLeft = end - m;
  const mix = minutesLeft < CROSSFADE_MINUTES ? 1 - minutesLeft / CROSSFADE_MINUTES : 0;
  return { a, b: mix > 0 ? next : a, mix, next, minutesLeft, overridden: false };
}

export function todWeights(s: TodState): Record<Tod, number> {
  const w: Record<Tod, number> = { day: 0, golden: 0, bluehour: 0, night: 0 };
  w[s.a] += 1 - s.mix;
  w[s.b] += s.mix;
  return w;
}

/**
 * Inline script that runs during HTML parsing, before hydration, so the static
 * hero image for the visitor's local time starts loading immediately (LCP).
 * It mirrors `computeTod(...).a` and is unit-tested against it.
 */
export function todBootstrapSource(imgId: string, sectionId: string): string {
  const images = JSON.stringify(TOD_IMAGE);
  const alts = JSON.stringify(TOD_ALT);
  const schedule = JSON.stringify(SCHEDULE);
  return (
    `(function(){try{` +
    `var q=/[?&]tod=(day|golden|bluehour|night)(?:&|$)/.exec(location.search),t;` +
    `if(q){t=q[1]}else{var d=new Date(),m=d.getHours()*60+d.getMinutes()+d.getSeconds()/60,s=${schedule};` +
    `if(m<s[0][0])m+=${DAY};t=s[s.length-1][1];for(var i=0;i<s.length;i++)if(m>=s[i][0])t=s[i][1];}` +
    `var im=document.getElementById(${JSON.stringify(imgId)}),se=document.getElementById(${JSON.stringify(sectionId)});` +
    `if(se)se.setAttribute("data-tod",t);` +
    `if(im&&!im.getAttribute("src")){im.alt=${alts}[t];im.src=${images}[t];}` +
    `}catch(e){}})();`
  );
}
