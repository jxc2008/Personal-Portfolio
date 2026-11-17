// Region page bodies: every piece of text below the banner meets WCAG AA against the
// background it actually sits on (paper, a section band, a card or a tinted button),
// in both themes, for every region. Key art and drawn scenery are covered elsewhere
// (keyart.spec.ts) and skipped here.

import { expect, test } from "@playwright/test";
import { REGIONS } from "../src/regions/regions";

const SIZES = [
  { width: 390, height: 844 },
  { width: 1440, height: 900 },
];
const THEMES = ["light", "dark"] as const;

for (const region of REGIONS) {
  for (const size of SIZES) {
    for (const theme of THEMES) {
      test(`${region.slug} at ${size.width}px, ${theme}: body text meets WCAG AA`, async ({ page }) => {
        await page.setViewportSize(size);
        await page.addInitScript((t) => localStorage.setItem("theme", t), theme);
        await page.goto(`/regions/${region.slug}`, { waitUntil: "networkidle" });

        const failures = await page.locator("article").first().evaluate((article) => {
          // Resolve any CSS colour (including color-mix and oklab) to sRGB through a canvas.
          const ctx = document.createElement("canvas").getContext("2d", { willReadFrequently: true })!;
          const rgba = (css: string): [number, number, number, number] => {
            ctx.clearRect(0, 0, 1, 1);
            ctx.fillStyle = "#000";
            ctx.fillStyle = css;
            ctx.fillRect(0, 0, 1, 1);
            const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
            return [r, g, b, a / 255];
          };
          const over = (top: number[], bottom: number[]) => [0, 1, 2].map((i) => top[i] * top[3] + bottom[i] * (1 - top[3]));
          // The colour behind an element: its own and its ancestors' backgrounds, composited.
          const backgroundOf = (el: Element): number[] => {
            const layers: number[][] = [];
            for (let n: Element | null = el; n; n = n.parentElement) {
              const c = rgba(getComputedStyle(n).backgroundColor);
              if (c[3] > 0) layers.push(c);
              if (c[3] >= 1) break;
            }
            return layers.reduceRight<number[]>((acc, layer) => over(layer, acc), [255, 255, 255]);
          };
          const lin = (v: number) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
          const lum = (c: number[]) => 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
          const ratio = (a: number[], b: number[]) => {
            const [x, y] = [lum(a), lum(b)];
            return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
          };

          const out: string[] = [];
          const seen = new Set<Element>();
          const walker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT);
          while (walker.nextNode()) {
            const el = walker.currentNode.parentElement;
            if (!el || seen.has(el) || !walker.currentNode.textContent?.trim()) continue;
            seen.add(el);
            // Over art: the banner, and tile art in the "Other regions" strip.
            if (el.closest("header") || el.closest("a span:has(> svg)")) continue;
            // WCAG exempts disabled controls.
            if (el.closest("button:disabled")) continue;
            const cs = getComputedStyle(el);
            if (cs.visibility === "hidden" || cs.display === "none" || el.getClientRects().length === 0) continue;
            const bg = backgroundOf(el);
            const fg = over(rgba(cs.color), bg);
            const px = parseFloat(cs.fontSize);
            const need = px >= 24 || (px >= 18.66 && Number(cs.fontWeight) >= 700) ? 3 : 4.5;
            const r = ratio(fg, bg);
            if (r < need) out.push(`${r.toFixed(2)} < ${need}: <${el.tagName.toLowerCase()}> "${el.textContent!.trim().slice(0, 40)}"`);
          }
          return out;
        });
        expect(failures).toEqual([]);
      });
    }
  }
}
