// Key art checks in a real browser, for every region with key art:
//  1. each keepClear box (e.g. Ridge's mast) stays in frame, and no text sits on it, on the
//     banner, the home tile and the small "Other regions" tile;
//  2. the text in those three places meets WCAG AA against whatever is behind it, measured
//     per pixel with the text hidden and no halo, so the worst spot in the art counts.

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

async function open(page: Page, slug: string) {
  await page.goto(`/regions/${slug}`, { waitUntil: "networkidle" });
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
 * Fails unless every line of `textSelector` inside `container` that sits over the key art
 * meets WCAG AA (4.5:1, or 3:1 for large text) against every pixel behind it. The text is
 * hidden (with its halo) before the screenshot, so the art itself is what's measured.
 */
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
        out.push({ tag: el.tagName, color: cs.color, need: large ? 3 : 4.5, x: r.left - cr.left, y: r.top - cr.top, w: r.width, h: Math.min(r.height, art.bottom - r.top) });
      }
    }
    return out;
  }, textSelector);
  expect(lines.length).toBeGreaterThan(0);
  await page.addStyleTag({ content: "[data-aa-text] { color: transparent !important; text-shadow: none !important; }" });
  const png = (await container.screenshot()).toString("base64");
  const worst = await page.evaluate(
    async ({ png, lines }) => {
      const img = new Image();
      img.src = `data:image/png;base64,${png}`;
      await img.decode();
      const c = document.createElement("canvas");
      c.width = img.width;
      c.height = img.height;
      const g = c.getContext("2d")!;
      g.drawImage(img, 0, 0);
      const lin = (v: number) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
      const lum = (r: number, gg: number, b: number) => 0.2126 * lin(r) + 0.7152 * lin(gg) + 0.0722 * lin(b);
      return lines.map((ln) => {
        const [tr, tg, tb, ta = 1] = ln.color.match(/[\d.]+/g)!.map(Number);
        const d = g.getImageData(Math.round(ln.x), Math.round(ln.y), Math.max(1, Math.round(ln.w)), Math.max(1, Math.round(ln.h))).data;
        let min = Infinity;
        for (let i = 0; i < d.length; i += 4) {
          // Text colour may be translucent: blend it over this pixel first.
          const a = lum(ta * tr + (1 - ta) * d[i], ta * tg + (1 - ta) * d[i + 1], ta * tb + (1 - ta) * d[i + 2]);
          const b = lum(d[i], d[i + 1], d[i + 2]);
          min = Math.min(min, (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05));
        }
        return { tag: ln.tag, need: ln.need, min: Number(min.toFixed(2)) };
      });
    },
    { png, lines },
  );
  console.log(worst.map((w) => `${w.tag} ${w.min}`).join(", "));
  for (const w of worst) expect(w.min, `${w.tag} line contrast`).toBeGreaterThanOrEqual(w.need);
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

/** The art of `slug`'s tile on the home page. */
async function homeTile(page: Page, slug: string) {
  await page.goto("/?tod=day", { waitUntil: "networkidle" });
  return loaded(page.locator(`#regions a[href="/regions/${slug}"] span:has(> img[data-testid="region-key-art"])`));
}

/** The art of `slug`'s small tile in the "Other regions" strip of another region's page. */
async function stripTile(page: Page, slug: string) {
  const elsewhere = REGIONS.find((r) => r.slug !== slug)!;
  await page.goto(`/regions/${elsewhere.slug}`, { waitUntil: "networkidle" });
  return loaded(page.getByRole("navigation", { name: "Other regions" }).locator(`a[href="/regions/${slug}"] span:has(> img[data-testid="region-key-art"])`));
}

async function loaded(art: Locator) {
  await art.scrollIntoViewIfNeeded();
  await art.locator("img").evaluate((img: HTMLImageElement) => img.decode());
  return art;
}

const overlaps = (a: Box, b: Box) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
const inside = (a: Box, f: Box) => a.left >= f.left && a.right <= f.right && a.top >= f.top && a.bottom <= f.bottom;

const TILE_NAME = ":scope > span:last-child";

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

        test('"Other regions" tile: name meets WCAG AA over the art', async ({ page }) => {
          await expectAA(page, await stripTile(page, region.slug), TILE_NAME);
        });
      });
    }
  }
}
