# PRD: Genshin Impact-Inspired Journey Portfolio Redesign

## 1. Overview

### Problem
The current personal website follows a conventional section-based layout common to most developer portfolios. It lacks a distinctive narrative structure and visual identity that would make it memorable.

### Vision
Transform the portfolio into a **scroll-driven adventure** where a stylized traveler character journeys through the site, guiding visitors through an elemental world. Each section of the site maps to a Genshin Impact-inspired element, with unique particles, color palettes, and visual effects that create an immersive, game-like experience.

### Inspiration
- **NYU SVS (nyusvs.org)**: Journey-based information architecture, canvas animations at section transitions, progressive disclosure, scroll-triggered content reveals
- **Genshin Impact**: Elemental color coding system, glassmorphism UI panels, particle effects, cel-shading aesthetics, fantasy adventure narrative in UI

---

## 2. Elemental Design System

### Element-to-Section Mapping

| Element | Color | Section | Symbolism |
|---------|-------|---------|-----------|
| Anemo (Wind) | Teal `#66C2C2` | Home | Beginning, freedom, first breath |
| Geo (Earth) | Amber `#D4A843` | Skills | Foundation, stability, building blocks |
| Electro (Lightning) | Purple `#9B59D0` | Projects | Energy, creation, sparks of innovation |
| Dendro (Nature) | Green `#5CB85C` | Experience | Growth, branching paths, cultivation |
| Hydro (Water) | Blue `#4A90D9` | Personal Passions | Flow, depth, reflection |

### Visual Treatment Per Element
Each element provides:
- **Base color** for section backgrounds and accents
- **Glow variant** (35-40% opacity) for hover states, borders, character aura
- **Background tint** (6% opacity) for subtle section differentiation
- **Unique particle preset** (shape, behavior, speed)
- **Transition landscape** (SVG silhouettes for scene changes)

---

## 3. The Traveler Character

### Design
A **CSS/SVG-coded stylized figure** - a hooded traveler with a flowing cloak and a glowing elemental orb. Abstract enough to animate smoothly, detailed enough to feel like a character. Built entirely in code (no external image assets).

### Poses
| Pose | Used When |
|------|-----------|
| Idle | Hero sections, pausing at content |
| Walking | User is scrolling, character moves through page |
| Casting | Section transitions, dramatic reveals |
| Sitting | Connect/footer sections |

### Behavior
- Character is fixed-positioned and moves based on scroll progress
- Follows a per-page waypoint path (x, y coordinates at scroll percentages)
- Glow color matches the current section's element
- Faces the direction of travel
- Smoothly transitions between poses at section boundaries

---

## 4. Page Specifications

### 4.1 Home Page - Anemo Theme

**Narrative**: The journey begins. Wind particles swirl as the traveler introduces themselves.

| Section | Content | Effects |
|---------|---------|---------|
| Hero (100vh) | Name, subtitle, scroll cue | Anemo particles, glassmorphism text panel, character idle |
| Journey Intro | "Follow the traveler..." | Character starts walking, parallax wind landscape |
| Featured Project | Three-Body Simulation showcase | Glassmorphism card, electro glow hover, character pauses |
| Explore Portals | Professional + Personal links | Element-colored portal cards with glow borders |
| Connect | Email CTA, social links | Character sitting, glassmorphism panel |

### 4.2 Professional Page - Multi-Element Journey

**Narrative**: A timeline-based adventure through skills, projects, and experience. The traveler walks through four elemental zones, each revealing a chapter of the professional story.

| Zone | Element | Content | Unique Effects |
|------|---------|---------|----------------|
| Hero | Anemo | Title, intro, CTA buttons | Wind particles, character enters |
| Transition | Anemo->Geo | Parallax landscape | Plains to rocky terrain |
| Skills | Geo | 4 skill categories as tag clouds | Glassmorphism cards, earth particles, amber glow |
| Transition | Geo->Electro | Parallax landscape | Stone pillars with lightning |
| Projects | Electro | Project cards (expandable) | Electric border glow, lightning particles, casting pose |
| Transition | Electro->Dendro | Parallax landscape | Energy tendrils to vines |
| Experience | Dendro | Timeline as growing vine/tree | Branch entries, nature particles, walking along vine |

### 4.3 Non-Professional Page - Hydro Theme

**Narrative**: A reflective journey through personal passions, flowing like water.

| Section | Content | Effects |
|---------|---------|---------|
| Hero | Title, tagline | Bubble/water particles, glassmorphism panel |
| Writing | Essay/reflection/ideas cards | Cards float like bubbles, water ripple hover |
| Music | Classical/original/covers cards | Audio-wave border animations, rhythmic particle pulse |

### 4.4 Three-Body Simulation - Minimal Update
- Glassmorphism on controls panel
- Electro accent colors on UI
- Existing canvas simulation unchanged

---

## 5. Scroll-Driven Journey Engine

### Architecture
- **Lenis** provides smooth scroll normalization
- **GSAP ScrollTrigger** drives character position, section pinning, and scene transitions
- **JourneyContext** (React Context) broadcasts current element, scroll progress, and active section to all components
- **useJourneySection hook** registers sections with the scroll engine
- **Framer Motion** retained for enter/exit animations and `whileInView` reveals

### Scene Transitions
Between major sections, a full-width transition zone:
1. Parallax SVG landscape silhouettes (3-4 layers at different scroll speeds)
2. Background gradient crossfades from one element to the next
3. Character walks through the scene
4. GSAP pins the transition briefly for dramatic effect

---

## 6. Visual Effects

### Glassmorphism
All content panels use frosted glass treatment:
- `backdrop-filter: blur(20px)`
- Semi-transparent background (`rgba(255,255,255,0.08)`)
- Subtle border (`rgba(255,255,255,0.12)`)
- Element-colored glow on hover

### Particles (tsparticles)
Full-screen particle layer behind content. Each element has a unique preset:
- **Anemo**: Swirling wind circles + leaves
- **Geo**: Slowly floating diamonds + squares
- **Electro**: Darting lines + flickering dots
- **Dendro**: Gently rising circles + triangle leaves
- **Hydro**: Rising bubbles with wobble

Particles transition smoothly when the active element changes.

### Navigation
Floating pill nav gains:
- Glassmorphism styling
- Element-colored active indicator
- Scroll progress bar colored with active element
- Small elemental icon next to active page

### Cursor
Existing GlowCursor changes glow color to match the active element.

---

## 7. Content Data Model

Data extracted from pages into typed config files for easy expansion:

```typescript
// src/app/data/professional.ts
interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link?: string;
  github?: string;
  timelineDate: string; // for chronological ordering
}

interface SkillCategory {
  name: string;
  icon: string;
  skills: string[];
}

interface Experience {
  id: string;
  title: string;
  organization: string;
  period: string;
  description: string;
  image: string;
  link?: string;
  timelineDate: string;
}
```

---

## 8. Performance Strategy

### Target: Max visual impact with graceful degradation

| Device | Strategy |
|--------|----------|
| Desktop (1024px+) | Full effects: all particles, character animation, parallax, scene transitions |
| Tablet (768-1023px) | Reduced particles (60%), simplified transitions, character at 60px |
| Mobile (<768px) | Minimal particles, color-fade transitions (no parallax), smaller character |
| Reduced motion | No particles, static character, no parallax, simple color fades, native scroll |

### Technical optimizations
- Dynamic imports for CharacterLayer and ElementalParticles (no SSR)
- `gsap.matchMedia()` for viewport-specific animation sets
- Canvas particles capped at 30fps on mobile
- `will-change: transform` on character layer
- Intersection Observer to lazy-load tsparticles
- Code-split character pose data

---

## 9. Tech Stack

| Tool | Role |
|------|------|
| Next.js 13.5.6 | Framework (existing) |
| React 18 | UI (existing) |
| TypeScript | Language (existing) |
| Framer Motion 10 | Enter/exit animations, whileInView (existing) |
| GSAP + ScrollTrigger | Scroll-driven character, pinning, timelines (NEW) |
| Lenis | Smooth scroll normalization (NEW) |
| tsparticles | Elemental particle system (NEW) |
| CSS Modules | Styling (existing) |
| CSS Custom Properties | Elemental theming (extend existing) |

---

## 10. Accessibility Requirements

- All decorative elements (particles, character, landscapes): `aria-hidden="true"`
- Glassmorphism panels: WCAG AA contrast maintained
- `prefers-reduced-motion`: all heavy effects disabled, content fully accessible
- Existing skip link, focus-visible styles, keyboard navigation preserved
- Scene transitions never trap keyboard focus
- Semantic HTML hierarchy maintained

---

## 11. New Files to Create

```
src/app/
  components/
    character/
      TravelerSVG.tsx           -- SVG character with pose support
      CharacterPoses.ts         -- Path data for each pose
      CharacterLayer.tsx        -- Fixed-position character container
      useCharacterScroll.ts     -- Scroll-driven character position hook
    journey/
      SmoothScroll.tsx          -- Lenis wrapper
      SceneTransition.tsx       -- Between-section parallax transitions
      ParallaxLandscape.tsx     -- SVG landscape silhouettes with parallax
      useJourneySection.ts      -- Hook to register a section with scroll engine
    particles/
      ElementalParticles.tsx    -- Full-screen tsparticles layer
    ui/
      GlassPanel.tsx            -- Reusable glassmorphism container
      GlassCard.tsx             -- Glassmorphism card with hover glow
      ElementBadge.tsx          -- Colored badge showing element type
      SectionHeader.tsx         -- Unified section header with element icon
    icons/
      ElementIcons.tsx          -- SVG icons for each element
  context/
    JourneyContext.tsx          -- Global journey state
  config/
    journeyPath.ts             -- Character waypoints per page
    particles.ts               -- tsparticles configs per element
    elements.ts                -- Element color/name/icon mapping
  data/
    professional.ts            -- Projects, skills, experience data
    nonprofessional.ts         -- Writing, music data
  styles/
    glassmorphism.module.css   -- Shared glass effect classes
  utils/
    scrollUtils.ts             -- GSAP ScrollTrigger utility functions
```

### Existing files to modify
- `globals.css` - elemental color variables, z-index scale
- `LayoutClient.tsx` - wrap with JourneyProvider, SmoothScroll, CharacterLayer, ElementalParticles
- `FloatingPillNav.tsx` - glassmorphism, element color indicator, progress bar
- `GlowCursor.tsx` - glow color from active element
- `page.tsx` (home) - full redesign with anemo theme
- `professional/page.tsx` - multi-element journey redesign
- `nonprofessional/page.tsx` - hydro theme redesign
- `three-body-simulation/page.tsx` - glassmorphism styling
- `utils/animations.ts` - add cinematic reveal variants

---

## 12. Implementation Order

1. **Foundation** - design system, dependencies, data extraction
2. **Character** - SVG traveler with poses
3. **Scroll Engine** - Lenis + GSAP + JourneyContext
4. **Particles** - elemental particle system
5. **Pages** - redesign all pages (professional is most complex)
6. **Nav + Polish** - update nav, cursor, layout wrapper
7. **Performance** - optimization pass, reduced motion, cross-browser testing

---

## 13. Success Criteria

- [ ] Traveler character smoothly journeys through each page on scroll
- [ ] Each section displays its elemental color theme, particles, and glassmorphism
- [ ] Scene transitions between sections feel cinematic with parallax landscapes
- [ ] Navigation reflects current element with color and icon
- [ ] All content is accessible with reduced motion enabled
- [ ] Lighthouse performance score >= 90 on desktop
- [ ] Site works on Chrome, Firefox, Safari
- [ ] Mobile experience is smooth with simplified effects
- [ ] Content data model supports easy addition of new projects/experiences
- [ ] Dark mode works correctly with all elemental themes
