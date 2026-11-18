// Key art checks in a real browser, for every region with key art:
//  1. each keepClear box (e.g. Ridge's mast) stays in frame, and no text sits on it, on the
//     banner, the home tile and the small "Other regions" tile;
//     Boxes marked `unshaded` must also keep their original colour (no darkening);
//  2. the text in those three places meets WCAG AA against what's directly around its
//     letters (a 1px ring, including the text's own shadow), at every pixel, so the
//     worst spot in the art counts.

import { expect, test, type Locator, type Page } from "@playwright/test";
import { REGIONS } from "../src/regions/regions";
import type { KeyArt } from "../src/regions/types";

const SIZES = [
  { width: 390, height: 844 },
  { width: 768, height: 1024 }, // tablet range (641-1023 px)
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
];
const THEMES = ["light", "dark"] as const;
const withArt = REGIONS.filter((r) => r.art?.keepClear?.length);
const ART = 'header img[data-testid="region-key-art"]';

type Box = { left: number; top: number; right: number; bottom: number };
type KeepClear = NonNullable<KeyArt["keepClear"]>;

/** The theme is applied after hydration; wait for it so renders don't straddle the switch.
    Also turn off smooth scrolling, so scrolling a tile into view lands at once. */
async function themeSettled(page: Page) {
  await page.waitForFunction(() => document.documentElement.getAttribute("data-theme") === (localStorage.getItem("theme") ?? "light"));
  await page.evaluate(() => (document.documentElement.style.scrollBehavior = "auto"));
}

async function open(page: Page, slug: string) {
  await page.goto(`/regions/${slug}`, { waitUntil: "networkidle" });
  await themeSettled(page);
  await page.evaluate(() => document.fonts.ready);
  await page.locator(ART).evaluate((img: HTMLImageElement) => img.decode());
}

/** Where each keepClear box lands on screen, following object-fit: cover and object-position. */
function keepClearOnScreen(img: Locator, boxes: KeepClear) {
  return img.evaluate((img: HTMLImageElement, boxes: KeepClear) => {
    const r = img.getBoundingClientRect();
    const [px, py] = getComputedStyle(img).objectPosition.split(" ").map((v) => parseFloat(v) / 100);
    const k = Math.max(r.width / img.naturalWidth, r.height / img.naturalHeight);
    const w = img.naturalWidth * k;
    const h = img.naturalHeight * k;
    const ox = r.left + (r.width - w) * px;
    const oy = r.top + (r.height - h) * py;
    return {
      frame: { left: r.left, top: r.top, right: r.right, bottom: r.bottom },
      boxes: boxes.map((b) => ({ label: b.label, left: ox + w * b.x[0], right: ox + w * b.x[1], top: oy + h * b.y[0], bottom: oy + h * b.y[1] })),
    };
  }, boxes);
}

/** Every rendered line of text, and every control, in `container`. */
function textIn(container: Locator) {
  return container.evaluate((header) => {
    const out: (Box & { text: string })[] = [];
    const walker = document.createTreeWalker(header, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const text = node.textContent?.trim();
      if (!text) continue;
      const range = document.createRange();
      range.selectNodeContents(node);
      for (const r of Array.from(range.getClientRects())) out.push({ text: text.slice(0, 30), left: r.left, top: r.top, right: r.right, bottom: r.bottom });
    }
    for (const el of Array.from(header.querySelectorAll("button"))) {
      const r = el.getBoundingClientRect();
      out.push({ text: `[${el.textContent}]`, left: r.left, top: r.top, right: r.right, bottom: r.bottom });
    }
    return out;
  });
}

/**
 * Fails unless the text of `textSelector` inside `container`, where it sits over the key
 * art, meets WCAG AA (4.5:1, or 3:1 for large text) against what's directly around its
 * letters: every pixel within RING px of a glyph, including the text's own shadow.
 *
 * One render, so nothing can misalign: the text is drawn in a probe magenta with its real
 * shadow kept. Magenta pixels are the letters; the untinted pixels right around them are
 * the background a reader sees there (art, darkening and shadow), measured against the
 * text's real colour. Anti-aliased edge pixels, partly magenta, are skipped.
 */
const RING = 1;
async function expectAA(page: Page, container: Locator, textSelector: string) {
  const lines = await container.evaluate((root, sel) => {
    const art = root.querySelector("img")!.getBoundingClientRect();
    const cr = root.getBoundingClientRect();
    const out: { tag: string; color: string; need: number; x: number; y: number; w: number; h: number }[] = [];
    for (const el of Array.from(root.querySelectorAll<HTMLElement>(sel))) {
      el.setAttribute("data-aa-text", "");
      const cs = getComputedStyle(el);
      const px = parseFloat(cs.fontSize);
      const large = px >= 24 || (px >= 18.66 && Number(cs.fontWeight) >= 700);
      const range = document.createRange();
      range.selectNodeContents(el);
      for (const r of Array.from(range.getClientRects())) {
        // Only text over the art (on phones the banner description sits below it).
        if (r.bottom <= art.top || r.top >= art.bottom) continue;
        const top = Math.max(r.top, art.top);
        out.push({ tag: el.tagName, color: cs.color, need: large ? 3 : 4.5, x: r.left - cr.left, y: top - cr.top, w: r.width, h: Math.min(r.bottom, art.bottom) - top });
      }
    }
    return out;
  }, textSelector);
  expect(lines.length).toBeGreaterThan(0);
  // Load the exact faces the text uses (display fonts swap in late), then let it paint.
  await container.evaluate(async (root) => {
    const faces = Array.from(root.querySelectorAll<HTMLElement>("[data-aa-text]")).map((el) => {
      const cs = getComputedStyle(el);
      return `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    });
    await Promise.all(faces.map((f) => document.fonts.load(f)));
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  });
  // Settle everything first: a colour still transitioning would skew the render.
  await page.addStyleTag({ content: "*, *::before, *::after { transition: none !important; animation: none !important; }" });

  const tag = await page.addStyleTag({ content: "[data-aa-text] { color: #ff00ff !important; }" });
  const probe = (await container.screenshot({ animations: "disabled" })).toString("base64");
  await tag.evaluate((n) => (n as Element).remove());
  if (process.env.AA_DEBUG) (await import("fs")).writeFileSync(`${process.env.AA_DEBUG}/aa-probe.png`, Buffer.from(probe, "base64"));

  const worst = await page.evaluate(
    async ({ probe, lines, ring }) => {
      const img = new Image();
      img.src = `data:image/png;base64,${probe}`;
      await img.decode();
      const c = document.createElement("canvas");
      c.width = img.width;
      c.height = img.height;
      const G = c.getContext("2d")!;
      G.drawImage(img, 0, 0);
      const lin = (v: number) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
      const lum = (r: number, gg: number, b: number) => 0.2126 * lin(r) + 0.7152 * lin(gg) + 0.0722 * lin(b);
      // How magenta a pixel is: red and blue both well above green.
      const tint = (d: Uint8ClampedArray, k: number) => Math.min(d[k], d[k + 2]) - d[k + 1];
      return lines.map((ln) => {
        const [tr, tg, tb, ta = 1] = ln.color.match(/[\d.]+/g)!.map(Number);
        const x0 = Math.max(0, Math.round(ln.x) - ring), y0 = Math.max(0, Math.round(ln.y) - ring);
        const w = Math.min(c.width - x0, Math.round(ln.w) + 2 * ring), h = Math.min(c.height - y0, Math.round(ln.h) + 2 * ring);
        const d = G.getImageData(x0, y0, w, h).data;
        const mask = new Uint8Array(w * h);
        for (let k = 0; k < w * h; k++) mask[k] = tint(d, 4 * k) > 90 ? 1 : 0;
        let min = Infinity, ringPixels = 0;
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const k = 4 * (y * w + x);
            if (mask[y * w + x] || tint(d, k) > 30) continue;
            let near = false;
            for (let dy = -ring; dy <= ring && !near; dy++) {
              for (let dx = -ring; dx <= ring && !near; dx++) {
                const yy = y + dy, xx = x + dx;
                if (yy >= 0 && yy < h && xx >= 0 && xx < w && mask[yy * w + xx]) near = true;
              }
            }
            if (!near) continue;
            ringPixels++;
            // Text colour may be translucent: blend it over this pixel first.
            const a = lum(ta * tr + (1 - ta) * d[k], ta * tg + (1 - ta) * d[k + 1], ta * tb + (1 - ta) * d[k + 2]);
            const bg = lum(d[k], d[k + 1], d[k + 2]);
            min = Math.min(min, (Math.max(a, bg) + 0.05) / (Math.min(a, bg) + 0.05));
          }
        }
        return { tag: ln.tag, need: ln.need, min: Number(min.toFixed(2)), ringPixels };
      });
    },
    { probe, lines, ring: RING },
  );
  console.log(worst.map((w) => `${w.tag} ${w.min}`).join(", "));
  for (const w of worst) {
    expect(w.ringPixels, `${w.tag}: found the letters`).toBeGreaterThan(20);
    expect(w.min, `${w.tag} contrast around the letters`).toBeGreaterThanOrEqual(w.need);
  }
}

/** Fails if a keepClear box is cropped or any text in `container` overlaps it. */
async function expectClear(container: Locator, boxes: KeepClear) {
  const { frame, boxes: onScreen } = await keepClearOnScreen(container.locator('img[data-testid="region-key-art"]'), boxes);
  const text = await textIn(container);
  expect(text.length).toBeGreaterThan(0);
  for (const box of onScreen) {
    expect(inside(box, frame), `${box.label} is cropped`).toBe(true);
    expect(text.filter((t) => overlaps(t, box)).map((t) => t.text), `text over the ${box.label}`).toEqual([]);
  }
}

/**
 * Fails if the darkening or the text changes the colour of an `unshaded` keep-clear box:
 * the box's pixels are compared with the same render with the darkening hidden, and with
 * the text (and its shadow) hidden.
 */
async function expectUnshaded(page: Page, container: Locator, boxes: KeepClear) {
  const marked = boxes.filter((b) => b.unshaded);
  const compare = async () => {
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
    const { boxes: onScreen } = await keepClearOnScreen(container.locator('img[data-testid="region-key-art"]'), marked);
    const frame = (await container.boundingBox())!;
    const shot = async () => (await container.screenshot({ animations: "disabled" })).toString("base64");
    const seen = await shot();
    // One source at a time (hiding several together changes how the renderer composites
    // the image, which alone shifts bright edges by a few levels): the darkening, then the text.
    const without = async (css: string) => {
      const tag = await page.addStyleTag({ content: `${css} { visibility: hidden !important; }` });
      const png = await shot();
      await tag.evaluate((n) => (n as Element).remove());
      return png;
    };
    const plains = [await without('[data-testid="region-art-scrim"]'), await without('header h1, header p, [data-part="name"]')];
    return page.evaluate(
      async ({ seen, plains, rects }) => {
        const load = async (png: string) => {
          const img = new Image();
          img.src = `data:image/png;base64,${png}`;
          await img.decode();
          const c = document.createElement("canvas");
          c.width = img.width;
          c.height = img.height;
          const g = c.getContext("2d")!;
          g.drawImage(img, 0, 0);
          return g;
        };
        const A = await load(seen);
        const Bs = await Promise.all(plains.map(load));
        return rects.map((r) => {
          const x = Math.round(r.x), y = Math.round(r.y), w = Math.max(1, Math.round(r.w)), h = Math.max(1, Math.round(r.h));
          const a = A.getImageData(x, y, w, h).data;
          let mean = 0, max = 0;
          for (const B of Bs) {
            const b = B.getImageData(x, y, w, h).data;
            let sum = 0;
            for (let k = 0; k < a.length; k += 4) {
              const d = (Math.abs(a[k] - b[k]) + Math.abs(a[k + 1] - b[k + 1]) + Math.abs(a[k + 2] - b[k + 2])) / 3;
              sum += d;
              max = Math.max(max, d);
            }
            mean = Math.max(mean, sum / (a.length / 4));
          }
          return { label: r.label, mean: Number(mean.toFixed(2)), max: Math.round(max) };
        });
      },
      { seen, plains, rects: onScreen.map((o) => ({ label: o.label, x: o.left - frame.x, y: o.top - frame.y, w: o.right - o.left, h: o.bottom - o.top })) },
    );
  };
  // Colour channels 0-255: the box must look the same as the bare art. A real darkening
  // shows on every attempt; a render caught mid-paint under load doesn't repeat.
  const ok = (r: { mean: number; max: number }[]) => r.every((x) => x.mean < 1.5 && x.max < 8);
  let results = await compare();
  for (let attempt = 1; attempt < 3 && !ok(results); attempt++) {
    await page.waitForTimeout(500);
    results = await compare();
  }
  console.log(JSON.stringify(results));
  for (const r of results) {
    expect(r.mean, `${r.label}: average change`).toBeLessThan(1.5);
    expect(r.max, `${r.label}: largest change`).toBeLessThan(8);
  }
}

/** `slug`'s tile on the home page. */
async function homeTile(page: Page, slug: string) {
  await page.goto("/?tod=day", { waitUntil: "networkidle" });
  await themeSettled(page);
  return loaded(page.locator(`#regions a[href="/regions/${slug}"]`));
}

/** `slug`'s small tile in the "Other regions" strip of another region's page. */
async function stripTile(page: Page, slug: string) {
  const elsewhere = REGIONS.find((r) => r.slug !== slug)!;
  await page.goto(`/regions/${elsewhere.slug}`, { waitUntil: "networkidle" });
  await themeSettled(page);
  return loaded(page.getByRole("navigation", { name: "Other regions" }).locator(`a[href="/regions/${slug}"]`));
}

async function loaded(tile: Locator) {
  await tile.scrollIntoViewIfNeeded();
  // Tile art is lazy; make sure it has really loaded and painted, as it will have once
  // a reader scrolls to it, or the drawn scenery underneath would be measured instead.
  await tile.locator('img[data-testid="region-key-art"]').evaluate(async (img: HTMLImageElement) => {
    img.loading = "eager";
    if (!img.complete || img.naturalWidth === 0) await new Promise((r) => img.addEventListener("load", r, { once: true }));
    await img.decode();
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  });
  await expect(tile.locator('img[data-testid="region-key-art"]')).toBeVisible();
  // Region display fonts aren't preloaded on the home page and swap in when ready.
  await tile.evaluate(() => document.fonts.ready);
  return tile;
}

const overlaps = (a: Box, b: Box) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
const inside = (a: Box, f: Box) => a.left >= f.left && a.right <= f.right && a.top >= f.top && a.bottom <= f.bottom;

const TILE_NAME = '[data-part="name"]';

for (const region of withArt) {
  const boxes = region.art!.keepClear!;
  for (const size of SIZES) {
    for (const theme of THEMES) {
      test.describe(`${region.slug} at ${size.width}px, ${theme}`, () => {
        test.beforeEach(async ({ page }) => {
          await page.setViewportSize(size);
          await page.addInitScript((t) => localStorage.setItem("theme", t), theme);
        });

        test("banner: key art subject in frame and clear of text", async ({ page }) => {
          await open(page, region.slug);
          await expectClear(page.locator("header").first(), boxes);
        });

        if (boxes.some((b) => b.unshaded)) {
          test("banner: unshaded subjects keep their original colour", async ({ page }) => {
            await open(page, region.slug);
            await expectUnshaded(page, page.locator("header").first(), boxes);
          });

          test("home tile: unshaded subjects keep their original colour", async ({ page }) => {
            await expectUnshaded(page, await homeTile(page, region.slug), boxes);
          });

          test('"Other regions" tile: unshaded subjects keep their original colour', async ({ page }) => {
            await expectUnshaded(page, await stripTile(page, region.slug), boxes);
          });
        }

        test("banner: text meets WCAG AA over the art", async ({ page }) => {
          await open(page, region.slug);
          await expectAA(page, page.locator("header").first(), "h1, p");
        });

        test("home tile: subject in frame and clear of the name", async ({ page }) => {
          await expectClear(await homeTile(page, region.slug), boxes);
        });

        test("home tile: name meets WCAG AA over the art", async ({ page }) => {
          await expectAA(page, await homeTile(page, region.slug), TILE_NAME);
        });

        test('"Other regions" tile: subject in frame and clear of the name', async ({ page }) => {
          await expectClear(await stripTile(page, region.slug), boxes);
        });

        test('"Other regions" tile: name meets WCAG AA over the art, or sits below it on phones', async ({ page }) => {
          const tile = await stripTile(page, region.slug);
          if (size.width <= 640) {
            // Small phone tiles put the name under the image (palette.spec checks it on the page colours).
            const [name, art] = await Promise.all([tile.locator(TILE_NAME).boundingBox(), tile.locator("img").boundingBox()]);
            expect(name!.y).toBeGreaterThanOrEqual(art!.y + art!.height);
            return;
          }
          await expectAA(page, tile, TILE_NAME);
        });
      });
    }
  }
}
