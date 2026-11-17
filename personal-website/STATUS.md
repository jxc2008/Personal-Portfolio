# Homepage hero — status

Branch: `feat/hero-depth-parallax` (from `main` @ `35a418f`).
Stack: Next.js 13.5.6 (App Router) + React 18 + TypeScript, so nothing was restructured.

## What was built

A full-viewport hero at the top of `/` that replaces the old text-only hero. The sections below it (featured project, explore, connect) are unchanged.

| File (`src/app/components/hero/`) | Role |
| --- | --- |
| `Hero.tsx`, `Hero.module.css` | Markup, static image, canvases, title, scroll cue, per-time-of-day text treatment |
| `timeOfDay.ts` | Schedule, crossfade maths, `?tod=` override, inline bootstrap script |
| `sceneMath.ts` | Cover-fit, zoom, parallax defaults, image→screen projection shared by the shader and the effects |
| `DepthParallaxRenderer.ts` | WebGL1 renderer ported from `parallax-reference.html` |
| `HeroEngine.ts` | Input, frame loop, texture loading, visibility and offscreen pausing, quality fallback |
| `effects/mist.ts` | Mist band over the lake (all times) |
| `effects/sunFlare.ts` | Bloom, anamorphic streak, rays and ghosts on the sun (golden) |
| `effects/fireflies.ts` | Fireflies in the reeds (night) |
| `effects/petals.ts` | Red petals in front of the scene (day, golden) |
| `effects/starTwinkle.ts` | Star twinkle as a GLSL chunk inside the parallax shader (night) |

No new dependencies. The display font is Cormorant Garamond via `next/font` (self-hosted at build time) and is a placeholder.

### 1. Depth parallax
- Shader ported from the prototype: depth displacement with one refinement step, depth gamma, cover-fit through `uScale`, and the `1 - strength * 2.2` zoom so offsets never sample past the edge.
- Input:
  - Pointer is smoothed with the prototype's 0.06/frame factor, made frame-rate independent.
  - Scrolling adds a downward drift of up to −0.45 over one hero height.
  - Idle drift starts after 2.5 s without pointer movement.
  - Touch devices (`(hover: none), (pointer: coarse)`) get idle drift only: no pointer and no scroll input.
- Defaults: **strength 0.02** (see the decisions section), focus 0.2, gamma 1.
- `prefers-reduced-motion`: the engine is never created and you get the static image only. It reacts live if the setting changes.

### 2. Time of day
- Windows: night 20:00–05:30, blue hour 05:30–06:30 and 18:30–20:00, golden 06:30–08:00 and 16:30–18:30, day otherwise.
- Over the last 20 minutes of each window the shader mixes the two textures (`uMix`). The mix updates every frame, and the schedule is checked every 30 s.
- Loading: the current image (plus the next one during a crossfade) and the depth map load first. The next window's image is fetched 45 minutes before it is needed. Images that a visit never needs are never downloaded, and unused textures are freed from the GPU.
- `?tod=day|golden|bluehour|night` pins the time of day and works in production builds too.

### 3. Ambient effects
- Each effect is its own module on one 2D overlay canvas, except star twinkle, which is in the shader (below).
- All of them use the shader's projection, so they sit correctly in the scene and move with the parallax at their depth.
- Particle caps: petals 10 (5 on narrow screens), fireflies 14 (8).
- The flare and fireflies use additive blending at low alpha.
- Star twinkle runs in the shader: it finds the painted stars by local contrast and modulates only those. It twinkles the stars in the painting rather than adding new dots, and leaves the moonlit clouds alone.
- Effects fade with the time-of-day weights, so they also crossfade.

### 4. Layout
- Title and one-line subtitle in the upper-left sky. Contrast treatment per time of day via `data-tod`:
  - day and golden: dark ink with a pale halo, because the title sits on bright cumulus
  - blue hour and night: pale ink with a dark halo and a soft borderless scrim
- Scroll cue at the bottom centre, linking to `#featured`. It sits above the site's floating nav pill.

### 5. Performance and accessibility
- An inline script runs during HTML parsing, before hydration: it picks the time of day, sets the `<img>` src and alt and `data-tod`, and so starts the right image downloading immediately. A unit test checks it against `computeTod` for all 1,440 minutes of the day.
- WebGL fades in (900 ms) only after its first frame is drawn. The static image is scaled by the same zoom, so the handover doesn't jump.
- WebGL resolution is capped at a DPR of 2, and the overlay canvas at 1.5 since it is all soft gradients. If a device averages slow frames during its first ~2.5 s, WebGL drops to about 0.66× resolution, once.
- Rendering stops when the tab is hidden (`visibilitychange`) or the hero is offscreen (`IntersectionObserver`).
- Alt text describes the scene for each time of day, and both canvases are `aria-hidden`.
- If WebGL fails (no context, shader error, image error or context lost), the static image stays and the 2D effects keep running with parallax off, so they still line up with the image.
- `<noscript>` falls back to the day image.

## Decisions worth knowing

- **Strength 0.02 instead of ~0.03.** I ran a tearing sweep (0.03 / 0.022 / 0.018 / 0.015) with the pointer pinned to opposite corners and cropped around both reed clusters.
  - At 0.03, reed blades leave doubled outlines and a vertical streak over the lake.
  - At 0.018 and below they are close to invisible.
  - 0.02 keeps the most motion with only faint ghosting at the extremes.
  - The displacement across a depth edge is (reed depth − lake depth) × strength, so focus can't fix tearing; only strength (or a different shader) can.
  - Tune live with `?strength=0.025&focus=0.2`.
- **The hero image never counts as LCP in Chrome.** Chrome treats an `<img>` covering the whole viewport as a background (confirmed: at 85% height it does count). So the **title** is the LCP element, and it must not start at opacity 0: only the subtitle and cue animate in.
  - Measured LCP is the title at 64–309 ms on a local production build at both sizes.
  - The image still starts loading at parse time.
- **Removed the layout's 0.3 s opacity fade on `/`** (`LayoutClient.tsx`). It held back first paint of the hero. Other routes keep it.
- **Removed `priority` from the featured-project image.** It is below the fold now, and its high-priority preload competed with the hero image.
- **`<noscript>` fallback image uses `loading="lazy"`.** Without it, React's server rendering preloads that image, which downloaded the 978 KB day image on every visit, whatever the time of day.
- **Old homepage tests replaced.** `__tests__/page.test.tsx` and `page.module.test.ts` checked markup that no longer existed (they were already failing on `main`). Replaced with tests for the new hero and page.

## Verification

- `tsc`, `next lint` and `next build` are clean.
- Hero, page and layout tests: 57 pass. The repo still has 23 failing tests, all in suites this branch doesn't touch (professional, nonprofessional, animations, globals-css); they were already failing on `main` (34 failures there before this branch).
- Playwright run against `next start`:
  - Screenshots at 1440×900 and 390×844 (touch, DPR 2) for each `?tod`.
  - Pointer-extreme reed crops on desktop, plus reduced-motion and no-WebGL runs.
  - WebGL became ready in all 8 runs, and nothing was logged apart from Next's own CSS-preload notices.
  - It ran with the `playwright` npm package because no Playwright MCP was connected to the session. Headless Chromium used SwiftShader, so timings and smoothness are not representative of real GPUs.

## Open issues / next steps

1. **Tearing isn't zero at 0.02.** Faint ghosting remains on the reeds when the pointer is held in a corner. Two ways to remove it properly:
   - a short ray-march in the shader (8–16 depth steps, nearest hit wins), which would let 0.03 look clean
   - a depth map with slightly dilated foreground edges
2. **Motion feel needs a human check on real hardware**, ideally a phone and a high-DPR laptop. The idle-drift amplitude (0.6 / 0.3) and the scroll drift (−0.45) are first guesses.
3. **Site chrome over the hero.** The floating nav pill and the purple `GlowCursor` from the existing layout render on top of the hero, and the cursor is the least "film" element on the page. Consider hiding the cursor on the hero, or restyling both, when the rest of the site is redesigned.
4. **Portrait phones crop the sun and the reeds out.** The golden flare bleeds in from the right edge, and fireflies are kept inside the frame, but a mobile-specific focal point (e.g. shifting the crop right) could be nicer.
5. **The time of day is the visitor's clock, not the sun.** Golden and blue hour won't match real sunset outside the fixed windows. Swapping in a sun-position calculation from an approximate location would be a contained change in `timeOfDay.ts`.
6. **Typography is placeholder** (Cormorant Garamond 600 and the existing DM Sans subtitle).
7. **`public/hero/parallax-reference.html` is publicly served** at `/hero/parallax-reference.html`, and it loads Google Fonts. Move it out of `public/` once it's no longer useful as a reference.
8. **Repo hygiene, outside this branch's scope:** `main` tracks the `.next/` build cache (265 files, including Windows-unsafe long paths). Untrack it and add `.next/` to `.gitignore`.
9. Safari before 18 ignores canvas `filter`, so near petals render sharp instead of slightly blurred there. This is cosmetic only.
