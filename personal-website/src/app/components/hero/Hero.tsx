"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Shippori_Mincho } from "next/font/google";
import { HeroEngine } from "./HeroEngine";
import {
  DEFAULT_PARALLAX,
  framingBootstrapSource,
  HERO_MIN_H,
  parseFocalOverride,
  parseParallaxOverride,
  staticObjectPositionX,
  zoomFor,
} from "./sceneMath";
import { computeTod, parseTodOverride, TOD_ALT, TOD_IMAGE, todBootstrapSource, type Tod } from "./timeOfDay";
import { worldTagline } from "@/regions";
import styles from "./Hero.module.css";

// Title face, chosen from the comparison in docs/title-fonts.
const display = Shippori_Mincho({ subsets: ["latin"], weight: "600", display: "swap" });

const SECTION_ID = "hero";
const IMG_ID = "hero-static";
const BOOTSTRAP = todBootstrapSource(IMG_ID, SECTION_ID) + framingBootstrapSource(IMG_ID);
const ZOOM_STYLE = { "--hero-zoom": (1 / zoomFor(DEFAULT_PARALLAX.strength)).toFixed(4) } as CSSProperties;

interface HeroProps {
  /** Element id the scroll cue jumps to. */
  nextId: string;
}

export default function Hero({ nextId }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const glRef = useRef<HTMLCanvasElement>(null);
  const fxRef = useRef<HTMLCanvasElement>(null);
  const [glReady, setGlReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const img = imgRef.current;
    const glCanvas = glRef.current;
    const fxCanvas = fxRef.current;
    if (!section || !img || !glCanvas || !fxCanvas) return;

    const override = parseTodOverride(window.location.search);
    const parallax = { ...DEFAULT_PARALLAX, ...parseParallaxOverride(window.location.search) };
    const focalOverride = parseFocalOverride(window.location.search);
    section.style.setProperty("--hero-zoom", (1 / zoomFor(parallax.strength)).toFixed(4));
    // Keep the static image framed like the shader (portrait shifts the focal point right).
    const frame = () => {
      const r = section.getBoundingClientRect();
      const x = staticObjectPositionX(r.width, Math.max(r.height, HERO_MIN_H), parallax, focalOverride);
      img.style.objectPosition = `${(x * 100).toFixed(3)}% 50%`;
    };
    frame();
    const ro = new ResizeObserver(frame);
    ro.observe(section);
    const applyTod = (tod: Tod) => {
      section.setAttribute("data-tod", tod);
      img.alt = TOD_ALT[tod];
      if (img.getAttribute("src") !== TOD_IMAGE[tod]) img.src = TOD_IMAGE[tod];
    };
    // The inline script normally did this during parsing; client-side
    // navigation doesn't run it, so make sure here.
    applyTod(computeTod(new Date(), override).a);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let engine: HeroEngine | null = null;
    const start = () => {
      engine?.dispose();
      engine = null;
      setGlReady(false);
      if (reduce.matches) return; // static image only
      engine = new HeroEngine({
        root: section,
        glCanvas,
        fxCanvas,
        todOverride: override,
        parallax,
        focalOverride,
        onGlReady: () => setGlReady(true),
        onGlFail: (reason) => {
          setGlReady(false);
          if (process.env.NODE_ENV !== "production") console.warn(`[hero] static fallback: ${reason}`);
        },
        onTodChange: applyTod,
      });
    };
    start();
    reduce.addEventListener("change", start);
    return () => {
      ro.disconnect();
      reduce.removeEventListener("change", start);
      engine?.dispose();
    };
  }, []);

  return (
    <section
      id={SECTION_ID}
      ref={sectionRef}
      className={styles.hero}
      style={ZOOM_STYLE}
      aria-labelledby="hero-title"
      suppressHydrationWarning
    >
      {/* Plain <img>: its src depends on the visitor's local time, picked by the
          inline script below before hydration so it starts loading at once. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        id={IMG_ID}
        ref={imgRef}
        className={styles.still}
        alt="Painted landscape of a still lake ringed by autumn trees beneath tall clouds, with reeds and wildflowers in the foreground."
        width={2912}
        height={1632}
        decoding="async"
        // @ts-expect-error -- React 18.2 types lack fetchPriority; the attribute is valid HTML.
        fetchpriority="high"
        suppressHydrationWarning
      />
      <script dangerouslySetInnerHTML={{ __html: BOOTSTRAP }} />
      <noscript>
        {/* loading="lazy" stops React's SSR from emitting a preload for this
            fallback; browsers load it eagerly anyway when scripting is off. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.still} src={TOD_IMAGE.day} alt={TOD_ALT.day} loading="lazy" />
      </noscript>

      <canvas ref={glRef} className={`${styles.layer} ${styles.gl} ${glReady ? styles.ready : ""}`} aria-hidden="true" />
      <canvas ref={fxRef} className={`${styles.layer} ${styles.fx}`} aria-hidden="true" />

      <div className={styles.copy}>
        <p className={styles.tagline}>{worldTagline()}</p>
        <h1 id="hero-title" className={`${styles.title} ${display.className}`}>
          Joseph Cheng
        </h1>
        <p className={styles.subtitle}>CS &amp; Mathematics at NYU — building with code, markets, and math.</p>
      </div>

      <a href={`#${nextId}`} className={styles.cue} aria-label="Scroll to content">
        <span className={styles.cueLabel}>Scroll</span>
        <span className={styles.cueLine} aria-hidden="true" />
      </a>
    </section>
  );
}
