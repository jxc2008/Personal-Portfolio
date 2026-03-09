"use client";

import { motion } from "framer-motion";
import { FaMusic, FaCompactDisc } from "react-icons/fa";
import styles from "./NonProfessional.module.css";
import SocialMediaLinks from "../components/SocialMediaLinks";
import {
  staggerContainer,
  staggerContainerDramatic,
  cardReveal,
  heroReveal,
  scaleReveal,
} from "../utils/animations";

export default function NonProfessional() {
  const writingCards = [
    {
      category: "Essay",
      title: "Coming Soon",
      excerpt: "My writing will appear here soon.",
      featured: true,
    },
    {
      category: "Reflection",
      title: "Coming Soon",
      excerpt: "My writing will appear here soon.",
      featured: false,
    },
    {
      category: "Ideas",
      title: "Coming Soon",
      excerpt: "My writing will appear here soon.",
      featured: false,
    },
  ];

  const musicCards = [
    {
      title: "Classical Pieces",
      icon: FaMusic,
      description: "Performing works from the classical piano repertoire.",
    },
    {
      title: "Original Compositions",
      icon: FaMusic,
      description: "Original pieces written for piano and other instruments.",
    },
    {
      title: "Covers & Transcriptions",
      icon: FaCompactDisc,
      description: "Piano arrangements of songs and soundtracks I enjoy.",
    },
  ];

  return (
    <div className={styles.page}>
      {/* ─── HERO ─── */}
      <section className={styles.hero} id="home">
        <div className={styles.heroNoise} />
        <div className={styles.heroGradient} />
        <motion.div
          className={styles.heroInner}
          initial="hidden"
          animate="visible"
          variants={staggerContainerDramatic}
        >
          <motion.p className={styles.heroLabel} variants={heroReveal}>
            Beyond the code
          </motion.p>
          <motion.h1 className={styles.heroTitle} variants={heroReveal}>
            Personal
            <br />
            Passions
          </motion.h1>
          <motion.p className={styles.heroTagline} variants={heroReveal}>
            Writing, music, and ideas that shape how I think.
          </motion.p>
          <motion.div variants={heroReveal}>
            <a href="mailto:joseph.x.cheng@gmail.com" className={styles.heroButton}>
              Get in Touch
            </a>
          </motion.div>
          <motion.div variants={heroReveal}>
            <SocialMediaLinks />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── WRITING ─── */}
      <section id="writingSection" className={styles.writing}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIndex}>01</span>
            <h2 className={styles.sectionTitle}>Writing &amp; Ideas</h2>
          </div>

          <motion.div
            className={styles.writingGrid}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {writingCards.map((card, index) => (
              <motion.article
                key={index}
                className={`${styles.writingCard} ${card.featured ? styles.writingCardFeatured : ""}`}
                variants={cardReveal}
              >
                <span className={styles.chip}>{card.category}</span>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardExcerpt}>{card.excerpt}</p>
                <span className={styles.readLink}>Read &rarr;</span>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── MUSIC ─── */}
      <section id="musicSection" className={styles.music}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIndex}>02</span>
            <h2 className={styles.sectionTitle}>Music</h2>
          </div>
          <p className={styles.sectionSub}>
            Things I play when I&apos;m not writing code.
          </p>

          <motion.div
            className={styles.musicGrid}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {musicCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div key={index} className={styles.musicCard} variants={scaleReveal}>
                  <div className={styles.musicIconWrap}>
                    <Icon className={styles.musicIcon} />
                  </div>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardDesc}>{card.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
