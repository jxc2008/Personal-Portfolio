# Regions: status

Branch `feat/regions`. The site is now "A world in five regions": Trading Floor, VALORANT Ridge, Piano Hall, Far Shore and The Lab. VALORANT Ridge is built out as the full example. The other four are stubs that list what's planned.

## Where things live

| What | File |
|---|---|
| All region copy (draft, edit freely) | `src/regions/regions.ts` |
| Writing, tagged by region | `src/regions/posts.ts` (empty for now) |
| Content types | `src/regions/types.ts` |
| Shared page template | `src/regions/RegionPage.tsx` + `.module.css` |
| Per-region palettes (light + dark) | `src/regions/themes.module.css` |
| Per-region display faces | `src/regions/fonts.ts` |
| Banner art (SVG, seeded) | `src/regions/scenery/` |
| Key art images (optional, per region) | `public/regions/<name>.webp`, set as `art` in `regions.ts` |
| Interactive pieces | `src/regions/widgets/` (veto calculator) |
| Values that go stale (VALORANT map pool + "as of" date) | `src/regions/config.ts` |
| Route | `src/app/regions/[slug]/page.tsx` → `/regions/<slug>` |
| Home page tiles | `src/regions/RegionsIndex.tsx`, `RegionTile.tsx` |

## How the template is content-driven

A region is one object: name, one-line `short`, `lede`, `scenery`, `state` (`open` or `charting`), optional `facts`, and `sections`. Each section has entries and can optionally embed a widget.

- Each **entry** has a title, a status (Shipped, Building, Testing, Drafting, Planned) and a summary. It can also have `details` paragraphs, `points` (short label/value facts), `links`, and a `featured` flag.
- **Sections with a `navLabel`** show up as anchors in the floating nav on that region's page.
- **Sections with a `widget`** lay out full width. Add new widgets in `widgets/index.tsx` and to the `WidgetRef` type.
- **Field notes** collect every post in `posts.ts` tagged with the region, newest first, or show an empty state.
- **`state: "charting"`** adds a "still being charted" note. That's the only difference between a stub and a full region. Fill in entries and flip it to `open`.
- **Bilingual text:** any text field can be `{ en, zh }`. A region whose `languages` includes `"zh"` gets the English/中文 switch, which also sets `lang` on the page. A test makes sure bilingual text only appears in regions that offer it.
- **The tagline counts the regions:** "A world in five regions" is generated from the data (`worldTagline()`).

## Region styles

Every region uses the same structure with its own palette, display face and banner. The banners are seeded SVG, so they come out identical on the server and the client. Layers drift slightly with the mouse, and that is turned off under reduced motion and on touch.

| Region | Banner | Display face |
|---|---|---|
| Trading Floor | price paths fanning out over green felt and ledger rules | Bodoni Moda |
| VALORANT Ridge | layered ridgelines at dawn, strata on the near ridge; stars in dark mode | Sofia Sans Condensed |
| Piano Hall | a stage light over a keyboard | Gloock |
| Far Shore | vermilion sun, wave rows, an island | Zen Kaku Gothic New (Shippori Mincho went to the site title) |
| The Lab | the figure-eight three-body orbit (integrated, not drawn) and a nudged copy that drifts apart, on blueprint grid | IBM Plex Mono |

Each palette has light and dark variants that follow the site's theme toggle. On Ridge the drawn banner itself changes: dawn in light mode, night with stars in dark mode.

### Key art

A region can set `art: { src, focus }` in `regions.ts`. The image then covers the drawn scenery on its banner and on its tiles (home and the travel strip) with `object-fit: cover`, and `focus` is the `object-position` that stays in frame. The drawn scenery stays underneath: it shows while the image loads and remains if the image fails (`RegionArt.tsx`).

VALORANT Ridge uses `/regions/ridge.webp` with focus `58% 52%` (the outpost). For a 16:9 image, this is the part that stays visible:

| Frame | Visible width | Visible height |
|---|---|---|
| Banner at 1440×900 | all | 8–92% |
| Banner at 1024×768 | 1–99% | all |
| Banner at 390×844 | 38–72% | all |
| Home tile (3:4) | 34–76% | all |
| Tile at phone width / travel strip (16:9) | all | all |

The phone banner is the tight one: the subject needs to sit between about 38% and 72% across.

**Text over key art.** When a region's art is showing, a shade in the page background colour sits behind the text. It's light behind dark text in light mode and dark behind light text in dark mode. On the banner it covers the upper left on wide screens, and on phones it covers a band across the top. On tiles it covers the top edge behind the name. On wide screens the banner text is also held to the left half. The shade isn't drawn if the image fails, since the drawn scenery is already painted to sit behind text.

**Checked on the real image** (2400×1350; mast measured at 60.1% across, 38–51.5% down). The mast and outpost are fully in frame at 1440, 1024 and 390 wide in both themes, and on the home tile at desktop and phone width. No line of text covers the mast. On phones the clearance is small: the mast tip is 3 px above the bottom of the description's last line, which only clears because "Champions." is short. A longer description would cover the mast tip on phones. Screenshots are in `docs/region-screenshots/keyart/`.

## VALORANT Ridge content

Drafted from the thunderedge and valorant-pricing-model repos (both public; both linked from the page).

- **Pricing system:** the live engine (Building), the side-baseline double-count fix (Drafting; the 59.9% vs 55% example is from the research report), and ThunderEdge (Shipped).
- **Research hypotheses:** roster churn, region lag, round-variance. All three are marked Testing, and I left the results out on purpose. The report is from 2026-11-17, it is still being rebuilt, and the historical odds are winner-only. Publish findings once you're happy with them.
- **Champions post-mortems:** 2025 and 2026, both Planned. Nothing is written yet, and I didn't invent any.
- **Veto calculator:** an exact minimax over the VCT best-of-three veto (ban, ban, pick, pick, ban, ban, decider).
  - You set each map's win chance. It shows every option at the current step with the series price it leads to, marks the best choice for whoever is acting, and can finish the veto with best play or undo step by step.
  - It compares best play against "ban your worst, pick your best".
  - It assumes maps are independent. The example numbers are made up, and the note under the calculator says so.
  - **Map pool:** one value, `VALORANT_MAP_POOL` in `src/regions/config.ts` (`maps` plus an `asOf` year-month). The calculator shows "Map pool as of September 2025". The example chances in `regions.ts` are keyed by map name; a test fails if an example names a map that has left the pool.
  - **Still to confirm:** the maps (Ascent, Bind, Corrode, Haven, Icebox, Lotus, Sunset) and the `asOf` date. I'm not certain of either.

No live P&L appears anywhere.

## Home and nav

- The hero has the tagline above the name. The scroll cue now goes to the new "The regions" section: five tiles, each in its region's style.
- The old Explore tiles (Professional / Personal) are gone. The nav is now Home and Regions. On a region page it also lists that region's sections.
- `/professional` and `/nonprofessional` are deleted. `next.config.js` redirects both to `/#regions` (308, permanent). The three-body page's back button now goes to The Lab.
- HI-LO is on the Trading Floor (its own "Trading game" section) and DerivaDash is in The Lab under Tools. Both are marked Shipped and link to their live sites and GitHub repos.
  - hilotrader.org, the old link, returns 404, so HI-LO links to its Vercel deployment instead.
- The old pages' images in `public/images/` (hilo, derivadash, marketing-internship, undergraduate-research) are no longer used. I left them in place.

## Mandarin

The Far Shore's 中文 text is a draft. `draftLanguages: ["zh"]` in `regions.ts` makes the page show "中文译文为草稿" next to the language switch while 中文 is selected. Remove that line once the text is final.

## Title font

**Decided:** Shippori Mincho 600, set slightly smaller than the placeholder so it stays on one line from 320 px to 1920 px. It is still the LCP element (about 120 ms in a local production run). The comparison that led to it is below.

All six candidates are on the live hero at all four times of day, at the same size and position. Sheets are in `docs/title-fonts/`:

- `title-fonts-all-times.jpg`: every font at every time of day
- `title-fonts-<tod>.jpg`: larger, one time of day each
- `title-fonts-mobile.jpg`: 390×844

The candidates are Cormorant Garamond (current), Fraunces, Instrument Serif, Shippori Mincho, Marcellus and Italiana. Shippori Mincho is wider and wraps to two lines on desktop at the current size, so it would need to be about 15% smaller. Italiana's hairlines get thin over bright cloud at day and golden hour.

## Verification

- `tsc`, `next lint` and `next build` are clean. All five region pages are statically generated.
- Jest: the new suites (`src/regions/__tests__`: veto solver vs an independent minimax on random pools, content integrity, map-pool config, template rendering, veto interaction, 中文 switch and draft label; `src/__tests__/redirects.test.ts`), plus the updated home and hero tests, all pass. 15 failures remain in the animations and globals-css suites. They were there before this work; the other 8 old failures went away with the deleted pages.
- Screenshots in `docs/region-screenshots/` (desktop light/dark, mobile, the stubs' banners, home tiles). There are no horizontal overflow and no console errors at 390 px.

## Open questions

1. Confirm the veto map pool and its `asOf` date in `config.ts`.
2. Whether to publish any research results yet.
3. The 中文 text (marked as draft on the page until you finalise it).
