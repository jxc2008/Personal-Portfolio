"use client";

import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SocialMediaLinks from "./components/SocialMediaLinks";
import Hero from "./components/hero/Hero";
import RegionsIndex from "@/regions/RegionsIndex";
import { scaleReveal } from "./utils/animations";

export default function Home() {
  const featuredRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: featuredRef,
    offset: ["start end", "end start"],
  });
  const featuredY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const featuredScale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);

  return (
    <div className={styles.container}>
      <Hero nextId="regions" />

      {/* ─── REGIONS ─── */}
      <RegionsIndex />


      {/* ─── FEATURED PROJECT ─── */}
      <section id="featured" className={styles.featured} ref={featuredRef}>
        <div className={styles.featuredInner}>
          <div className={styles.featuredMeta}>
            <span className={styles.metaIndex}>01</span>
            <span className={styles.metaLabel}>Featured Project</span>
          </div>

          <motion.div
            className={styles.featuredCard}
            style={{ y: featuredY, scale: featuredScale }}
          >
            <Link href="/three-body-simulation" className={styles.featuredImageWrap}>
              <Image
                src="/images/three-body-simulation-image.png"
                alt="Three-Body Simulation — interactive gravitational physics demo"
                width={800}
                height={600}
                className={styles.featuredImage}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className={styles.featuredImageOverlay} />
            </Link>
          </motion.div>

          <div className={styles.featuredText}>
            <h2 className={styles.featuredTitle}>
              Three-Body
              <br />
              Simulation
            </h2>
            <p className={styles.featuredDesc}>
              An interactive simulation of the three-body problem — complex
              gravitational interactions between celestial bodies rendered in real-time.
            </p>
            <Link href="/three-body-simulation" className={styles.featuredCta}>
              <span>View Project</span>
              <span className={styles.ctaArrow}>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CONNECT ─── */}
      <section className={styles.connect}>
        <div className={styles.connectNoise} />
        <motion.div
          className={styles.connectInner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleReveal}
        >
          <p className={styles.connectLabel}>Get in touch</p>
          <h2 className={styles.connectHeading}>
            Let&apos;s build
            <br />
            something together.
          </h2>
          <a href="mailto:joseph.x.cheng@gmail.com" className={styles.connectButton}>
            joseph.x.cheng@gmail.com
          </a>
          <SocialMediaLinks />
        </motion.div>
      </section>
    </div>
  );
}
