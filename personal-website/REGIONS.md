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
| Interactive pieces | `src/regions/widgets/` (veto calculator) |
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
| Far Shore | vermilion sun, wave rows, an island | Shippori Mincho |
| The Lab | the figure-eight three-body orbit (integrated, not drawn) and a nudged copy that drifts apart, on blueprint grid | IBM Plex Mono |

Each palette has light and dark variants that follow the site's theme toggle. On Ridge the banner itself changes: dawn in light mode, night with stars in dark mode.

## VALORANT Ridge content

Drafted from the thunderedge and valorant-pricing-model repos (both public; both linked from the page).

- **Pricing system:** the live engine (Building), the side-baseline double-count fix (Drafting; the 59.9% vs 55% example is from the research report), and ThunderEdge (Shipped).
- **Research hypotheses:** roster churn, region lag, round-variance. All three are marked Testing, and I left the results out on purpose. The report is from 2026-11-17, it is still being rebuilt, and the historical odds are winner-only. Publish findings once you're happy with them.
- **Champions post-mortems:** 2025 and 2026, both Planned. Nothing is written yet, and I didn't invent any.
- **Veto calculator:** an exact minimax over the VCT best-of-three veto (ban, ban, pick, pick, ban, ban, decider).
  - You set each map's win chance. It shows every option at the current step with the series price it leads to, marks the best choice for whoever is acting, and can finish the veto with best play or undo step by step.
  - It compares best play against "ban your worst, pick your best".
  - It assumes maps are independent. The example numbers are made up, and the note under the calculator says so.
  - **The map pool needs checking:** it's Ascent, Bind, Corrode, Haven, Icebox, Lotus, Sunset in `regions.ts`. I wasn't sure of the current competitive pool.

No live P&L appears anywhere.

## Home and nav

- The hero has the tagline above the name. The scroll cue now goes to the new "The regions" section: five tiles, each in its region's style.
- The old Explore tiles (Professional / Personal) are gone. The nav is now Home and Regions. On a region page it also lists that region's sections.
- `/professional` and `/nonprofessional` still build but are no longer linked. HI-LO and DerivaDash from the old Projects page aren't placed in a region yet.

## Title font comparison

All six candidates are on the live hero at all four times of day, at the same size and position. Sheets are in `docs/title-fonts/`:

- `title-fonts-all-times.jpg`: every font at every time of day
- `title-fonts-<tod>.jpg`: larger, one time of day each
- `title-fonts-mobile.jpg`: 390×844

The candidates are Cormorant Garamond (current), Fraunces, Instrument Serif, Shippori Mincho, Marcellus and Italiana. Shippori Mincho is wider and wraps to two lines on desktop at the current size, so it would need to be about 15% smaller. Italiana's hairlines get thin over bright cloud at day and golden hour.

## Verification

- `tsc`, `next lint` and `next build` are clean. All five region pages are statically generated.
- Jest: the new suites (`src/regions/__tests__`: veto solver vs an independent minimax on random pools, content integrity, template rendering, veto interaction, 中文 switch), plus the updated home and hero tests, all pass. The 23 failures in professional, nonprofessional, animations and globals-css were there before and are unchanged.
- Screenshots in `docs/region-screenshots/` (desktop light/dark, mobile, the stubs' banners, home tiles). There are no horizontal overflow and no console errors at 390 px.

## Open questions

1. Map pool for the veto calculator (see above).
2. Whether to publish any research results yet.
3. Delete `/professional` and `/nonprofessional`, or keep them unlinked?
4. Where HI-LO and DerivaDash go (Trading Floor and The Lab are the obvious homes).
5. The title font, and whether Far Shore keeps Shippori Mincho if the title takes it.
