# Regions: status

The site is "A world in five regions": Trading Floor, VALORANT Ridge, Piano Hall, Far Shore and The Lab. Only finished or in-progress work is public; planned work stays in the data but off the site (see "What's public" below).

## Where things live

| What | File |
|---|---|
| All region copy (draft, edit freely) | `src/regions/regions.ts` |
| Writing, tagged by region | `src/regions/posts.ts` (empty for now) |
| Content types | `src/regions/types.ts` |
| Shared page template | `src/regions/RegionPage.tsx` + `.module.css` |
| Page colours per region (light + dark) | `palette` in `src/regions/regions.ts` |
| Derived page tokens; banner and scenery colours | `src/regions/themes.module.css` |
| Per-region display faces | `src/regions/fonts.ts` |
| Banner art (SVG, seeded) | `src/regions/scenery/` |
| Key art images (optional, per region) | `public/regions/<name>.webp`, set as `art` in `regions.ts` |
| Interactive pieces | `src/regions/widgets/` (veto calculator) |
| Values that go stale (VALORANT map pool + "as of" date) | `src/regions/config.ts` |
| Route | `src/app/regions/[slug]/page.tsx` → `/regions/<slug>` |
| Home page tiles | `src/regions/RegionsIndex.tsx`, `RegionTile.tsx` |

## How the template is content-driven

A region is one object: name, one-line `short`, `lede`, a one-line `teaser`, `scenery`, optional `facts`, and `sections`. Each section has entries and can optionally embed a widget.

- Each **entry** has a title, a status (Shipped, Building, Testing, Drafting, Planned) and a summary. It can also have `details` paragraphs, `points` (short label/value facts), `links`, and a `featured` flag.
- **Sections with a `navLabel`** show up as anchors in the floating nav on that region's page.
- **Sections with a `widget`** lay out full width. Add new widgets in `widgets/index.tsx` and to the `WidgetRef` type.
- **Field notes** collect every post in `posts.ts` tagged with the region, newest first, or show an empty state.
- **What's public.** Entries marked **Planned** or **Drafting** stay in `regions.ts` but aren't shown, and a section left with nothing to show is dropped (a section with a widget always shows; Field notes always shows, with "Notes coming soon." until there are posts). To see everything while working locally, run the dev server with `NEXT_PUBLIC_SHOW_UNFINISHED=1 npm run dev`; production builds ignore the flag.
- **Open or coming soon.** A region with at least one **Shipped** entry is "Open" on the tiles. A region with nothing shipped shows its banner, its `teaser` (one line in its voice, under 15 words) and Field notes, and reads "Coming soon" on the tiles. Ship something and it opens on its own; there's no flag to flip.
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

### Page colours

Each region's `palette` in `regions.ts` sets six colours for light mode and six for dark: `paper` (page), `ink` (text), `accent` (marks, never text), `link` (accent that's safe for text), `band` (the region's second colour, from its scenery) and `card` (raised surfaces). `paletteVars()` passes them to the page, its tiles and its footer as `--pl-*` / `--pd-*`. `themes.module.css` picks the set for the current theme and derives the rest (secondary and muted text, dividers, heading tint, button wash) the same way for every region.

Below the banner, every region page gets the same treatment:

- Alternate sections on a full-width band.
- Headings tinted slightly toward the accent, with a short accent bar above each section title.
- Accent-tinted dividers.
- Accent links.
- The featured entry, notes and empty states as cards.
- The calculator's actions as buttons.
- The footer in the region's paper and ink.

From 1024 px up, descriptions are 16 px and small labels at least 13.6 px.

`e2e/palette.spec.ts` checks every piece of text in the body and footer for WCAG AA against its real background, for all five regions, in both themes, at 390, 1024 and 1440 px.

### Key art

Every region has key art: `art: { src, focus, keepClear }` in `regions.ts`. The image covers the drawn scenery on the region's banner and on its tiles (home and the "Other regions" strip) with `object-fit: cover`; `focus` is the `object-position` that stays in frame. The drawn scenery stays underneath: it shows while the image loads and remains if the image fails (`RegionArt.tsx`).

| Region | Image | Focus | Keep clear (fractions of the image) |
|---|---|---|---|
| Trading Floor | `trading.webp` | 62% 20% | hall 40–75.4% × 44.5–64.5%; roof and chimneys 47–73% × 37.3–44.5% |
| VALORANT Ridge | `ridge.webp` | 58% 52% | mast 59.6–60.6% × 38.1–51.5%; outpost 55.8–63% × 51.5–58.5% |
| Piano Hall | `piano.webp` | 60% 52% | hall front 48.7–66.3% × 34.5–64% |
| Far Shore | `shore.webp` | 63% 52% | front boat 55.4–76.2% × 47.5–77.8%; sun 68.1–73.7% × 21.7–31.4% (unshaded) |
| The Lab | `lab.webp` | 75% 60% | observatory dome 64.5–73.1% × 66.9–84% |

All five files are 2400×1350 (16:9). For a 16:9 image, this is the part of its width that stays visible: all of it on wide banners (1440 crops height instead, to about 84%); about 98% at 1024; about 60% on a 768 tablet; about 37% on a 390 phone; about 42% on a 3:4 home tile; all of it on 16:9 tiles. The phone banner is the tight one: a subject must be no more than about 37% of the image wide, and the focus places that window (it starts at about 0.63 × the focus).

**New art:** keep the subject right of centre and under about 35% of the width, leave the upper left calm for the title, measure the subject's boxes on the full-size file, and run the e2e suite.

**Text over key art.** While a region's art is showing, its banner always takes the dark treatment, whatever the theme: light text over the region's dark background colour (the `--r-art-*` tokens in `themes.module.css`). The page below the banner stays themed. If the image fails, the drawn banner and its usual layout come back.

- **Desktop (1024 px and up):** the shade is a soft radial fade out of the top-left corner on a long, eased curve (many small steps, so there's no visible strip where it ends). The text is held to the upper left: the title is about 15% smaller than on drawn banners, and the description column is at most 32% of the banner's width, so it ends by about 38% across (Trading Floor's hall starts at 40%). The description scales with the banner (16 px at 1024, about 22 px at 1440).
- **Phones and tablets (under 1024 px):** only the title stays over the art. The description and language switch move below the image, on the themed page colours. The art is 70% of the screen height (drawn banners use 76%), which widens the phone crop to about 37% of the image. The title carries a layered text shadow (a crisp, translucent 1px dark rim, then wider soft layers) over a large, very soft, low-opacity darkening anchored in the top-left corner, with no visible shape or edge. It never touches an unshaded subject (below).
- **Tiles:** the same dark treatment: the layered text shadow on the name over the same kind of soft corner darkening. The name's colour and shadow are set on the name itself, because a region's dark-mode banner tokens on the tile element would otherwise override them. On the small "Other regions" tiles at phone width (about 160×90) every name laid over the art would sit on its subject, so there the name sits below the image.

**Unshaded subjects.** A keep-clear box marked `unshaded: true` (Far Shore's sun) keeps its original colour: the darkening has a soft hole over it, fully clear out past the box's corners and feathering back to the darkening by about 2.4× its half-size. `RegionArt` builds the hole as a mask in the image's own coordinates; `mask-size`/`mask-position` place that over the image's cover-cropped rectangle (from the art container's size), so it follows the subject at every size, on banners and tiles. Container units stay out of the gradient itself, because Chrome resolves them against the viewport inside mask images.

**The e2e test.** `e2e/keyart.spec.ts` (Playwright, real browser) checks every region at 390, 768, 1024 and 1440 px in both themes:

1. Each keep-clear box is fully in frame, and no text or control overlaps it, on the banner, the home tile and the "Other regions" tile. Unshaded boxes must also look the same as the bare art: compared with the same render without the darkening, and without the text and its shadow.
2. The banner text and the tile names meet WCAG AA against what's directly around the letters. The text is rendered once in a probe colour with its real shadow kept; every untinted pixel within 1 px of a glyph is measured against the text colour, so the shadow counts as a halo and the worst spot fails the check. Before measuring, the test waits for the theme to apply and the display fonts to load, and for lazy tile art to finish loading. On phone-width strip tiles it checks the name sits below the image instead.

Run it with `npm run build && npm run test:e2e`. It isn't part of `npm test`. Screenshots are in `docs/region-screenshots/keyart/`.

## VALORANT Ridge content

Drafted from the thunderedge and valorant-pricing-model repos (both public; both linked from the page).

- **Pricing system:** the live engine (Building), the side-baseline double-count fix (Drafting; the 59.9% vs 55% example is from the research report), and ThunderEdge (Shipped).
- **Research hypotheses:** region lag and round variance are "Tested — no effect at close"; roster churn is "Pre-registered for Kickoff 2027". An entry's `statusLabel` in `regions.ts` overrides the default status text when a result needs saying.
- **Champions post-mortems:** 2025 and 2026, both Planned. Nothing is written yet, and I didn't invent any.
- **Veto calculator:** an exact minimax over the VCT best-of-three veto (ban, ban, pick, pick, ban, ban, decider).
  - You set each map's win chance. It shows every option at the current step with the series price it leads to, marks the best choice for whoever is acting, and can finish the veto with best play or undo step by step.
  - It compares best play against "ban your worst, pick your best".
  - It assumes maps are independent. The example numbers are made up, and the note under the calculator says so.
  - **Map pool:** one value, `VALORANT_MAP_POOL` in `src/regions/config.ts`: Abyss, Bind, Corrode, Haven, Lotus, Summit, Sunset, with `patch: "13.08"` and `asOf: "2026-10"`. The calculator shows "Map pool as of Patch 13.08 (Oct 2026)". When the pool rotates, update the maps, patch and date there, and the example chances in `regions.ts` (a test fails unless the examples name exactly the pool's maps).

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
- Screenshots in `docs/region-screenshots/` (desktop light/dark, mobile, the other regions' banners, home tiles). There are no horizontal overflow and no console errors at 390 px.

## Open questions

1. The 中文 text (marked as draft on the page until you finalise it).
