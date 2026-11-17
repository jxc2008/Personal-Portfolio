import {
  coverScale,
  DEFAULT_PARALLAX,
  focalCenter,
  framingBootstrapSource,
  HERO_MIN_H,
  PORTRAIT_FOCAL_U,
  project,
  staticObjectPositionX,
  SUN_UV,
  visibleRange,
  zoomFor,
  type View,
} from "../sceneMath";

const P = DEFAULT_PARALLAX;

function view(w: number, h: number, pointer: [number, number] = [0, 0]): View {
  const scale = coverScale(w, h, zoomFor(P.strength));
  return { w, h, scale, center: focalCenter(w, h, scale, P), pointer, parallax: P };
}

describe("portrait focal point", () => {
  it("keeps landscape centred", () => {
    expect(view(1440, 900).center).toEqual([0.5, 0.5]);
    expect(view(900, 900).center).toEqual([0.5, 0.5]);
  });

  it("shifts portrait right to at least the minimum focal point", () => {
    const v = view(768, 1024);
    expect(v.center[0]).toBeGreaterThanOrEqual(PORTRAIT_FOCAL_U);
  });

  it.each([
    [390, 844],
    [360, 780],
    [430, 932],
    [768, 1024],
    [820, 1180],
  ])("keeps the sun in frame at %ix%i", (w, h) => {
    const [x] = project(SUN_UV[0], SUN_UV[1], 0, view(w, h));
    expect(x).toBeGreaterThan(0);
    expect(x).toBeLessThan(w);
  });

  it("never lets the largest parallax offset sample past the right edge", () => {
    for (const [w, h] of [[390, 844], [300, 1000], [768, 1024]]) {
      const v = view(w, h);
      const maxOffset = P.strength * Math.max(P.focus, 1 - P.focus);
      expect(visibleRange(v).u[1] + maxOffset).toBeLessThanOrEqual(1 + 1e-9);
    }
  });

  it("maps the focal point to the viewport centre at rest (effects line up)", () => {
    const v = view(390, 844);
    const [x, y] = project(v.center[0], v.center[1], 0.5, v);
    expect(x).toBeCloseTo(195);
    expect(y).toBeCloseTo(422);
  });
});

describe("static image framing", () => {
  it("is centred on landscape", () => {
    expect(staticObjectPositionX(1440, 900)).toBe(0.5);
  });

  it("shows the focal point at the viewport centre after the zoom transform", () => {
    const w = 390;
    const h = 844;
    const x = staticObjectPositionX(w, h);
    const w0 = w / h / (2912 / 1632); // visible width fraction before zoom
    const centreU = x * (1 - w0) + w0 / 2;
    expect(centreU).toBeCloseTo(view(w, h).center[0], 6);
  });

  it("inline script agrees with staticObjectPositionX", () => {
    document.body.innerHTML = `<img id="i">`;
    for (const [w, h] of [[390, 844], [360, 640], [768, 1024], [1440, 900], [500, 400]]) {
      Object.defineProperty(window, "innerWidth", { configurable: true, value: w });
      Object.defineProperty(window, "innerHeight", { configurable: true, value: h });
      const img = document.getElementById("i") as HTMLImageElement;
      img.style.objectPosition = "";
      // eslint-disable-next-line no-new-func
      new Function(framingBootstrapSource("i"))();
      const H = Math.max(h, HERO_MIN_H);
      const expected = staticObjectPositionX(w, H);
      if (w >= H) {
        expect(img.style.objectPosition).toBe("");
      } else {
        expect(parseFloat(img.style.objectPosition) / 100).toBeCloseTo(expected, 4);
      }
    }
  });
});
