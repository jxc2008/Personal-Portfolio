import { computeTod, parseTodOverride, todBootstrapSource, todWeights, TOD_IMAGE, type Tod } from "../timeOfDay";

const at = (h: number, m: number, s = 0) => new Date(2026, 10, 16, h, m, s);

describe("computeTod windows", () => {
  it.each<[number, number, Tod]>([
    [0, 0, "night"],
    [3, 0, "night"],
    [5, 29, "night"],
    [5, 30, "bluehour"],
    [6, 29, "bluehour"],
    [6, 30, "golden"],
    [7, 59, "golden"],
    [8, 0, "day"],
    [12, 0, "day"],
    [16, 29, "day"],
    [16, 30, "golden"],
    [18, 29, "golden"],
    [18, 30, "bluehour"],
    [19, 59, "bluehour"],
    [20, 0, "night"],
    [23, 59, "night"],
  ])("%i:%i is %s", (h, m, tod) => {
    expect(computeTod(at(h, m)).a).toBe(tod);
  });
});

describe("crossfade over the last 20 minutes of a window", () => {
  it("does not fade before the last 20 minutes", () => {
    const s = computeTod(at(16, 9));
    expect(s).toMatchObject({ a: "day", b: "day", mix: 0, next: "golden" });
  });

  it("fades day → golden from 16:10 to 16:30", () => {
    expect(computeTod(at(16, 10)).mix).toBeCloseTo(0);
    const mid = computeTod(at(16, 20));
    expect(mid).toMatchObject({ a: "day", b: "golden" });
    expect(mid.mix).toBeCloseTo(0.5);
    expect(computeTod(at(16, 29, 59)).mix).toBeGreaterThan(0.99);
  });

  it("fades night → blue hour across midnight wrap (05:10–05:30)", () => {
    const s = computeTod(at(5, 20));
    expect(s).toMatchObject({ a: "night", b: "bluehour" });
    expect(s.mix).toBeCloseTo(0.5);
  });

  it("does not fade at midnight (night continues)", () => {
    expect(computeTod(at(23, 50))).toMatchObject({ a: "night", b: "night", mix: 0 });
  });

  it("weights always sum to 1", () => {
    for (let m = 0; m < 1440; m += 7) {
      const w = todWeights(computeTod(at(Math.floor(m / 60), m % 60)));
      expect(w.day + w.golden + w.bluehour + w.night).toBeCloseTo(1);
    }
  });
});

describe("?tod override", () => {
  it("parses valid values only", () => {
    expect(parseTodOverride("?tod=golden")).toBe("golden");
    expect(parseTodOverride("?x=1&tod=night")).toBe("night");
    expect(parseTodOverride("?tod=bluehour&x=1")).toBe("bluehour");
    expect(parseTodOverride("?tod=dusk")).toBeNull();
    expect(parseTodOverride("?tod=dayx")).toBeNull();
    expect(parseTodOverride("")).toBeNull();
  });

  it("pins the state with no crossfade", () => {
    expect(computeTod(at(16, 20), "night")).toMatchObject({ a: "night", b: "night", mix: 0, overridden: true });
  });
});

describe("inline bootstrap script", () => {
  const run = (date: Date, search = "") => {
    document.body.innerHTML = `<section id="s"></section><img id="i">`;
    jest.useFakeTimers().setSystemTime(date);
    window.history.replaceState(null, "", `/${search}`);
    // eslint-disable-next-line no-new-func
    new Function(todBootstrapSource("i", "s"))();
    jest.useRealTimers();
    return {
      tod: document.getElementById("s")!.getAttribute("data-tod"),
      src: document.getElementById("i")!.getAttribute("src"),
    };
  };

  it("agrees with computeTod for every minute of the day", () => {
    for (let m = 0; m < 1440; m++) {
      const d = at(Math.floor(m / 60), m % 60);
      const expected = computeTod(d).a;
      const got = run(d);
      expect(got.tod).toBe(expected);
      expect(got.src).toBe(TOD_IMAGE[expected]);
    }
  });

  it("honours ?tod=", () => {
    expect(run(at(12, 0), "?tod=night").tod).toBe("night");
  });
});
