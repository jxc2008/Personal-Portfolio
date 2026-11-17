// Best-of-three map veto, solved exactly.
//
// Team 0 tries to maximise its series win chance, team 1 to minimise it.
// Maps are treated as independent; p[i] is team 0's chance of winning map i.
// The pool is small (7 maps, 6 veto steps = 5,040 lines), so plain minimax
// over every line is instant and needs no pruning.

export type Side = 0 | 1;

export interface Step {
  side: Side;
  action: "ban" | "pick";
}

/** VCT best-of-three: ban, ban, pick, pick, ban, ban, and the last map is the decider. */
export const BO3_STEPS: Step[] = [
  { side: 0, action: "ban" },
  { side: 1, action: "ban" },
  { side: 0, action: "pick" },
  { side: 1, action: "pick" },
  { side: 0, action: "ban" },
  { side: 1, action: "ban" },
];

/** The same order with the other team starting. */
export function stepsFor(first: Side, steps: Step[] = BO3_STEPS): Step[] {
  return first === 0 ? steps : steps.map((s) => ({ ...s, side: (1 - s.side) as Side }));
}

/** Chance team 0 wins a best-of-three on these maps (order doesn't matter). */
export function bo3(p1: number, p2: number, p3: number): number {
  return p1 * p2 + p1 * (1 - p2) * p3 + (1 - p1) * p2 * p3;
}

export interface Outcome {
  /** Team 0's chance of winning the series. */
  value: number;
  /** The maps chosen at each remaining step, in order. */
  line: number[];
  /** Maps played, in order: the two picks, then the decider. */
  maps: number[];
}

function playedMaps(n: number, steps: Step[], history: number[]): number[] {
  const picks = history.filter((_, k) => steps[k].action === "pick");
  const decider = [...Array(n).keys()].find((i) => !history.includes(i));
  return decider === undefined ? picks : [...picks, decider];
}

function seriesValue(p: number[], maps: number[]): number {
  if (maps.length !== 3) throw new Error(`a best-of-three needs 3 maps, got ${maps.length}`);
  return bo3(p[maps[0]], p[maps[1]], p[maps[2]]);
}

/** Best play for both teams from `history` (the maps chosen so far). */
export function solve(p: number[], steps: Step[], history: number[] = []): Outcome {
  if (history.length === steps.length) {
    const maps = playedMaps(p.length, steps, history);
    return { value: seriesValue(p, maps), line: [], maps };
  }
  const { side } = steps[history.length];
  let best: Outcome | null = null;
  let bestMap = -1;
  for (let i = 0; i < p.length; i++) {
    if (history.includes(i)) continue;
    const o = solve(p, steps, [...history, i]);
    const better = best === null || (side === 0 ? o.value > best.value + 1e-12 : o.value < best.value - 1e-12);
    if (better) {
      best = o;
      bestMap = i;
    }
  }
  if (!best) throw new Error("no maps left to choose");
  return { value: best.value, line: [bestMap, ...best.line], maps: best.maps };
}

export interface Option {
  map: number;
  /** Team 0's series chance if this map is chosen now and both teams play well afterwards. */
  value: number;
}

/** Every choice open at the current step, with what it leads to. */
export function options(p: number[], steps: Step[], history: number[]): Option[] {
  if (history.length >= steps.length) return [];
  const out: Option[] = [];
  for (let i = 0; i < p.length; i++) {
    if (!history.includes(i)) out.push({ map: i, value: solve(p, steps, [...history, i]).value });
  }
  return out;
}

/** Maps played once the veto in `history` is complete, or null if it isn't. */
export function finalMaps(n: number, steps: Step[], history: number[]): number[] | null {
  return history.length === steps.length ? playedMaps(n, steps, history) : null;
}

/** A simple baseline: each team bans its worst map and picks its best, ignoring what comes next. */
export function greedy(p: number[], steps: Step[]): Outcome {
  const history: number[] = [];
  for (const { side, action } of steps) {
    const left = p.map((_, i) => i).filter((i) => !history.includes(i));
    // Team 0 bans its lowest map and picks its highest; team 1 the reverse.
    const wantHigh = (side === 0) === (action === "pick");
    left.sort((a, b) => (wantHigh ? p[b] - p[a] : p[a] - p[b]));
    history.push(left[0]);
  }
  const maps = playedMaps(p.length, steps, history);
  return { value: seriesValue(p, maps), line: history, maps };
}
