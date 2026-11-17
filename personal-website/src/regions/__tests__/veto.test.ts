import { BO3_STEPS, bo3, finalMaps, greedy, options, solve, stepsFor, type Step } from "../widgets/veto";

/** Independent minimax over the set of surviving maps, written differently from solve(). */
function reference(p: number[], steps: Step[], left: number[] = p.map((_, i) => i), picks: number[] = []): number {
  if (steps.length === 0) {
    const [a, b, c] = [...picks, ...left];
    return bo3(p[a], p[b], p[c]);
  }
  const [{ side, action }, ...rest] = steps;
  const values = left.map((m) =>
    reference(
      p,
      rest,
      left.filter((x) => x !== m),
      action === "pick" ? [...picks, m] : picks,
    ),
  );
  return side === 0 ? Math.max(...values) : Math.min(...values);
}

function rng(seed: number) {
  return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
}

const EXAMPLE = [0.62, 0.48, 0.55, 0.41, 0.66, 0.52, 0.37];

describe("bo3", () => {
  it("is the chance of winning at least two of three", () => {
    const [a, b, c] = [0.7, 0.4, 0.55];
    expect(bo3(a, b, c)).toBeCloseTo(a * b + a * c + b * c - 2 * a * b * c, 12);
    expect(bo3(0.5, 0.5, 0.5)).toBeCloseTo(0.5, 12);
    expect(bo3(1, 1, 0)).toBe(1);
  });
});

describe("solve", () => {
  it("matches an independent minimax on random map pools", () => {
    const r = rng(42);
    for (let k = 0; k < 25; k++) {
      const p = Array.from({ length: 7 }, () => 0.15 + r() * 0.7);
      expect(solve(p, BO3_STEPS).value).toBeCloseTo(reference(p, BO3_STEPS), 12);
      expect(solve(p, stepsFor(1)).value).toBeCloseTo(reference(p, stepsFor(1)), 12);
    }
  });

  it("returns a full veto line whose maps give the stated price", () => {
    const best = solve(EXAMPLE, BO3_STEPS);
    expect(best.line).toHaveLength(6);
    expect(new Set(best.line).size).toBe(6);
    expect(finalMaps(7, BO3_STEPS, best.line)).toEqual(best.maps);
    expect(bo3(EXAMPLE[best.maps[0]], EXAMPLE[best.maps[1]], EXAMPLE[best.maps[2]])).toBeCloseTo(best.value, 12);
  });

  it("is 50% when every map is a coin flip", () => {
    expect(solve(Array(7).fill(0.5), BO3_STEPS).value).toBeCloseTo(0.5, 12);
  });

  it("continues correctly from a partial veto", () => {
    const p = [0.9, 0.2, 0.5, 0.5, 0.5, 0.5, 0.5];
    const out = solve(p, BO3_STEPS, [1, 0]); // team 0 bans its worst map, team 1 bans team 0's best
    expect(out.line).toHaveLength(4);
    expect(out.maps.every((m) => m >= 2)).toBe(true);
    expect(out.value).toBeCloseTo(0.5, 12);
  });
});

describe("options", () => {
  it("scores every remaining map, and the acting team's best equals solve()", () => {
    const opts = options(EXAMPLE, BO3_STEPS, [6]);
    expect(opts.map((o) => o.map)).toEqual([0, 1, 2, 3, 4, 5]);
    // The second step belongs to team 1, which minimises.
    expect(Math.min(...opts.map((o) => o.value))).toBeCloseTo(solve(EXAMPLE, BO3_STEPS, [6]).value, 12);
  });

  it("is empty once the veto is done", () => {
    expect(options(Array(7).fill(0.5), BO3_STEPS, [0, 1, 2, 3, 4, 5])).toEqual([]);
  });
});

describe("stepsFor and greedy", () => {
  it("swaps who acts when the second team starts", () => {
    expect(stepsFor(1).map((s) => s.side)).toEqual([1, 0, 1, 0, 1, 0]);
    expect(stepsFor(1).map((s) => s.action)).toEqual(BO3_STEPS.map((s) => s.action));
  });

  it("bans each team's worst map and picks its best", () => {
    const g = greedy(EXAMPLE, BO3_STEPS);
    // A bans Sunset (37), B bans Icebox (A's 66), A picks Ascent (62),
    // B picks Haven (A's 41), A bans Bind (48), B bans Corrode (A's 55); Lotus decides.
    expect(g.line).toEqual([6, 4, 0, 3, 1, 2]);
    expect(g.maps).toEqual([0, 3, 5]);
  });
});
