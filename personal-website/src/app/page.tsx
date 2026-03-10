"use client";

import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SocialMediaLinks from "./components/SocialMediaLinks";
import { heroReveal, staggerContainerDramatic, scaleReveal } from "./utils/animations";

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
      {/* ─── HERO ─── */}
      <section className={styles.hero}>
        <div className={styles.heroNoise} />
        <div className={styles.heroGradient} />

        <motion.div
          className={styles.heroContent}
          initial="hidden"
          animate="visible"
          variants={staggerContainerDramatic}
        >
          <motion.div className={styles.heroLabel} variants={heroReveal}>
            <span className={styles.heroLabelLine} />
            <span>CS &amp; Mathematics @ NYU</span>
          </motion.div>

          <motion.h1 className={styles.heroName} variants={heroReveal}>
            Joseph
            <br />
            Cheng
          </motion.h1>

          <motion.p className={styles.heroSub} variants={heroReveal}>
            Building at the intersection of code,
            <br className={styles.brDesktop} />
            mathematics, and creativity.
          </motion.p>
        </motion.div>

        <motion.div
          className={styles.scrollCue}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <motion.div
            className={styles.scrollDot}
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          />
          <span className={styles.scrollTrack} />
        </motion.div>
      </section>

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
                priority
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

      {/* ─── EXPLORE ─── */}
      <section className={styles.explore}>
        <motion.div
          className={styles.exploreInner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={staggerContainerDramatic}
        >
          <motion.div variants={heroReveal}>
            <Link href="/professional" className={styles.exploreTile}>
              <span className={styles.tileIndex}>Projects</span>
              <h3 className={styles.tileHeading}>Professional<br />Pursuits</h3>
              <p className={styles.tileDesc}>Research, engineering, and quantitative work</p>
              <span className={styles.tileArrow}>&rarr;</span>
            </Link>
          </motion.div>

          <motion.div variants={heroReveal}>
            <Link href="/nonprofessional" className={styles.exploreTile}>
              <span className={styles.tileIndex}>Passions</span>
              <h3 className={styles.tileHeading}>Personal<br />Interests</h3>
              <p className={styles.tileDesc}>Writing, piano, ideas, and creative exploration</p>
              <span className={styles.tileArrow}>&rarr;</span>
            </Link>
          </motion.div>
        </motion.div>
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
