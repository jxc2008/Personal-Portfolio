# Homepage hero — status

Branch: `feat/hero-depth-parallax` (from `main` @ `35a418f`).
Stack: Next.js 13.5.6 (App Router) + React 18 + TypeScript, so nothing was restructured.
Review screenshots are in [`docs/hero-screenshots/`](docs/hero-screenshots/); the original WebGL prototype is in [`docs/parallax-reference.html`](docs/parallax-reference.html).

## What was built

A full-viewport hero at the top of `/` that replaces the old text-only hero. The sections below it (featured project, explore, connect) are unchanged.

| File (`src/app/components/hero/`) | Role |
| --- | --- |
| `Hero.tsx`, `Hero.module.css` | Markup, static image and its framing, canvases, title, scroll cue, per-time-of-day text treatment |
| `timeOfDay.ts` | Schedule, crossfade maths, `?tod=` override, inline bootstrap script |
| `sceneMath.ts` | Cover-fit, zoom, portrait focal point, parallax defaults, image→screen projection shared by the shader, the effects and the static image |
| `DepthParallaxRenderer.ts` | WebGL1 renderer: 12-step depth ray-march (see §1) |
| `HeroEngine.ts` | Input, frame loop, texture loading, visibility and offscreen pausing, quality fallback |
| `effects/mist.ts` | Mist band over the lake (all times) |
| `effects/sunFlare.ts` | Bloom, anamorphic streak, rays and ghosts on the sun (golden) |
| `effects/fireflies.ts` | Fireflies in the reeds (night) |
| `effects/petals.ts` | Red petals in front of the scene (day, golden) |
| `effects/starTwinkle.ts` | Star twinkle as a GLSL chunk inside the parallax shader (night) |

`GlowCursor.tsx` (site-wide) gained a generic opt-out: any element marked `data-glow-cursor="off"` hides the glow while the pointer is over it, and the hero uses it.

No new dependencies. The title font is Shippori Mincho 600 via `next/font` (self-hosted at build time), chosen from the comparison in `docs/title-fonts/`; it replaced the Cormorant Garamond placeholder.

### 1. Depth parallax
- **Shader:** the prototype's one-step refinement is replaced by a short ray-march.
  - A surface at texture point `p` with depth `D` appears where `uv + dir·(D − focus) = p`.
  - For each pixel the shader steps the candidate depth `h` from near (1) to far (0) in **12 steps** and stops at the **first** step whose sample is at least that near. The nearest hit wins, and the loop exits early on the hit.
  - A secant step between the last miss and the hit refines `h`.
  - When the pointer offset is ~0, it skips the march entirely.
  - Unchanged from the prototype: depth gamma, cover-fit and the `1 - strength * 2.2` edge-safe zoom.
- **Input:**
  - Pointer is smoothed with the prototype's 0.06/frame factor, made frame-rate independent.
  - Scrolling adds a downward drift of up to −0.45 over one hero height.
  - Idle drift starts after 2.5 s without pointer movement.
  - Touch devices (`(hover: none), (pointer: coarse)`) get idle drift only: no pointer and no scroll input.
- **Defaults:** strength **0.02** (from the sweep, see the decisions section), focus 0.2, gamma 1.
- `prefers-reduced-motion`: the engine is never created and you get the static image only. It reacts live if the setting changes.

### 2. Time of day
- Windows: night 20:00–05:30, blue hour 05:30–06:30 and 18:30–20:00, golden 06:30–08:00 and 16:30–18:30, day otherwise.
- Over the last 20 minutes of each window the shader mixes the two textures (`uMix`). The mix updates every frame, and the schedule is checked every 30 s.
- Loading: the current image (plus the next one during a crossfade) and the depth map load first. The next window's image is fetched 45 minutes before it is needed. Images that a visit never needs are never downloaded, and unused textures are freed from the GPU.
- `?tod=day|golden|bluehour|night` pins the time of day and works in production builds too.

### 3. Ambient effects
- Each effect is its own module on one 2D overlay canvas, except star twinkle, which is in the shader.
- All of them place themselves with the same projection as the shader, including the portrait focal point, so they line up with the scene and move with the parallax at their depth.
- Particle caps: petals 10 (5 on narrow screens), fireflies 14 (8).
- The flare and fireflies use additive blending at low alpha.
- Star twinkle finds the painted stars by local contrast and modulates only those, leaving the moonlit clouds alone.
- Effects fade with the time-of-day weights, so they also crossfade.

### 4. Layout
- Title and one-line subtitle in the upper-left sky. Contrast treatment per time of day via `data-tod`:
  - day and golden: dark ink with a pale halo
  - blue hour and night: pale ink with a dark halo and a soft borderless scrim
- Scroll cue at the bottom centre, linking to `#featured`. It sits above the site's floating nav pill.
- **Portrait framing (aspect < 1):** the cover-fit focal point moves right, so the sun and the right reed cluster stay in frame (details in the decisions section). Landscape stays centred.
  - The shader gets it as `uCenter`.
  - The static image gets a matching `object-position`, set by the inline script before first paint and then kept up to date on resize.
  - The focal point is clamped so the largest parallax offset can never sample past the image edge.
  - `?focal=0.62` pins it, for comparison.
- **Glow cursor:** hidden while the pointer is over the hero and restored below it. Because scrolling moves content under a still pointer without a `mousemove`, it also re-checks on scroll. The native cursor is never hidden.

### 5. Performance and accessibility
- An inline script runs during HTML parsing, before hydration. It picks the time of day, sets the `<img>` src and alt, `data-tod`, and the portrait `object-position`, so the right image starts downloading immediately, already framed. Both halves are unit-tested against their TypeScript counterparts.
- WebGL fades in (900 ms) only after its first frame is drawn. The static image is scaled and positioned to match, so the handover doesn't jump.
- WebGL resolution is capped at a DPR of 2, and the overlay canvas at 1.5 since it is all soft gradients. If a device averages slow frames during its first ~2.5 s, WebGL drops to about 0.66× resolution, once.
- Rendering stops when the tab is hidden (`visibilitychange`) or the hero is offscreen (`IntersectionObserver`).
- Alt text describes the scene for each time of day, and both canvases are `aria-hidden`.
- If WebGL fails (no context, shader error, image error or context lost), the static image stays and the 2D effects keep running with parallax off.
- `<noscript>` falls back to the day image.

## Decisions worth knowing

- **Strength 0.02, chosen by sweep after the ray-march** ([`strength-sweep-raymarch.png`](docs/hero-screenshots/strength-sweep-raymarch.png): rows 0.02 / 0.025 / 0.03, pointer at both corners, same reed crops as the review shots).
  - The ray-march **removed the doubled reed outlines at all three strengths**; the left reeds are clean even at 0.03.
  - A different artifact limits the strength: beside the **tall stalk in the right reed cluster**, a vertical band of broken lake ripples drags with the stalk, and at 0.025 its top shows a stair-step. It is faint at 0.02, visible at 0.025 and obvious at 0.03.
  - So **0.02 is the highest of the three with no visible ghosting.**
  - The cause is the assets, not the shader ([`right-stalk-paint-vs-depth.png`](docs/hero-screenshots/right-stalk-paint-vs-depth.png)):
    - In the depth map that stalk is wider than in the painting, and it stops well short of the painted stalk's top.
    - The painted stalk is also out of focus, so its soft edge has lake ripples baked in, and they move with it.
    - Fixing it needs a depth-map touch-up there (match the stalk's width and full height), after which a re-sweep could likely go higher.
  - For comparison, the old one-step shader at 0.03 doubled the reed outlines on both sides, and at 0.02 it still doubled the right stalk.
  - Tune live with `?strength=0.025&focus=0.2`.
- **The portrait focal point is computed, not a fixed 0.62.** On a 390×844 phone, the visible window is only ~25% of the image width, so a focal point of 0.62 shows u≈0.50–0.74: the sun (u=0.91) and the right reeds (u≈0.82–0.99) stay out of frame ([`portrait-focal-comparison.jpg`](docs/hero-screenshots/portrait-focal-comparison.jpg)).
  - The focal point is therefore `max(0.62, the value that keeps the sun 0.03 inside the right edge)`, clamped for parallax safety.
  - That gives ≈0.82 on a 390×844 phone; it falls back to 0.62 as the viewport widens (0.62 is enough once the visible window is about 0.64 of the image width).
  - The same framing is used at every time of day, so crossfades stay aligned.
- **The hero image never counts as LCP in Chrome.** Chrome treats an `<img>` covering the whole viewport as a background. So the **title** is the LCP element, and it must not start at opacity 0: only the subtitle and cue animate in. Measured LCP is the title at 64–309 ms on a local production build.
- **Removed the layout's 0.3 s opacity fade on `/`** (`LayoutClient.tsx`). It held back first paint of the hero. Other routes keep it.
- **Removed `priority` from the featured-project image.** It is below the fold, and its high-priority preload competed with the hero image.
- **`<noscript>` fallback image uses `loading="lazy"`.** Without it, React's server rendering preloads it, which downloaded the 978 KB day image on every visit.
- **Old homepage tests replaced.** They checked markup that no longer existed (they were already failing on `main`).

## Verification

- `tsc`, `next lint` and `next build` are clean.
- Hero, GlowCursor, page and layout tests: **61 pass**. That includes the framing-script parity check, the sun-in-frame check at five phone and tablet sizes, the parallax edge-safety check, and the cursor opt-out and scroll re-check. The repo still has 23 failing tests, all in suites this branch doesn't touch (professional, nonprofessional, animations, globals-css); they were already failing on `main`.
- Playwright run against `next start` (Chromium with SwiftShader):
  - **Screenshots** at 1440×900 and 390×844 (touch, DPR 2) for each `?tod`, plus 16 reed crops with the pointer pinned to opposite corners. WebGL became ready in all 8 runs, and nothing was logged apart from Next's own CSS-preload notices.
  - **Static vs WebGL framing** with the pointer at rest, mean absolute pixel difference on a 0–255 scale: 0.86 at 390×844, 0.95 at 768×1024 and 0.26 at 1440×900. For scale, deliberately mis-framing the static image (centred) gives 32.7 at 390×844.
  - **Glow cursor:** hidden over the hero, restored after scrolling alone moves the pointer onto the content below, hidden again when scrolling back up.
- The run used the `playwright` npm package because no Playwright MCP was connected; the scripts are kept out of the repo. SwiftShader timings and smoothness are not representative of real GPUs.

## Screenshots (`docs/hero-screenshots/`)

| File | What |
| --- | --- |
| `desktop-{day,golden,bluehour,night}.jpg` | 1440×900, pointer centred |
| `mobile-{day,golden,bluehour,night}.jpg` | 390×844 @2x, touch (idle drift) |
| `reed-crops/desktop-<tod>-{tl,br}-reeds{L,R}.png` | Reed clusters with the pointer at the top-left / bottom-right extreme, strength 0.02 |
| `strength-sweep-raymarch.png` | Ray-march tearing sweep at 0.02 / 0.025 / 0.03 |
| `right-stalk-paint-vs-depth.png` | Painting vs depth map around the right reed's tall stalk |
| `portrait-focal-comparison.jpg` | 390×844 golden at focal 0.62 vs the computed focal point |

## Open issues / next steps

1. **Right-reed stalk in the depth map.** Widen it and extend it to the painted stalk's full height to remove the residual band, then re-sweep: strength might then go to 0.025–0.03.
2. **Motion feel needs a human check on real hardware**, ideally a phone and a high-DPR laptop: the 12-step ray-march cost on mid-range phones, the idle-drift amplitude (0.6 / 0.3) and the scroll drift (−0.45). The automatic resolution drop is the safety net if the march is too slow.
3. **The floating nav pill still renders over the hero.** Restyle it when the rest of the site is redesigned.
4. **Portrait framing drops the left trees and left reeds** in exchange for the sun. If you'd rather keep more of the left, lower the sun padding or cap the focal point (`PORTRAIT_FOCAL_U` and `SUN_PAD` in `sceneMath.ts`).
5. **The time of day is the visitor's clock, not the sun.** A sun-position calculation would be a contained change in `timeOfDay.ts`.
6. ~~Typography is placeholder~~ Resolved: the title is Shippori Mincho 600 (one line from 320 px to 1920 px; still the LCP element). The subtitle is the existing DM Sans.
7. **`.next/` is tracked on `main`.** It is untracked on its own branch, `chore/untrack-next-build`.
8. Safari before 18 ignores canvas `filter`, so near petals render sharp instead of slightly blurred there. This is cosmetic only.
