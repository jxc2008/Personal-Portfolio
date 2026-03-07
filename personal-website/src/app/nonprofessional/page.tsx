"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { FaMusic, FaCompactDisc } from "react-icons/fa";
import styles from "./NonProfessional.module.css";
import Navigation from "../components/Navigation";
import SocialMediaLinks from "../components/SocialMediaLinks";
import Footer from "../components/Footer";

const navLinks = [
  { label: "Top", sectionId: "home" },
  { label: "Writing", sectionId: "writingSection" },
  { label: "Music", sectionId: "musicSection" },
];

export default function NonProfessional() {
  const [showNav, setShowNav] = useState(false);
  const writingSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!writingSectionRef.current) return;
      const writingTop = writingSectionRef.current.getBoundingClientRect().top;
      setShowNav(writingTop <= window.innerHeight * 0.5);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const writingCards = [
    {
      category: "Essay",
      /* TODO: Replace with real title */
      title: "Coming Soon",
      /* TODO: Replace with real excerpt */
      excerpt: "My writing will appear here soon.",
    },
    {
      category: "Reflection",
      /* TODO: Replace with real title */
      title: "Coming Soon",
      /* TODO: Replace with real excerpt */
      excerpt: "My writing will appear here soon.",
    },
    {
      category: "Ideas",
      /* TODO: Replace with real title */
      title: "Coming Soon",
      /* TODO: Replace with real excerpt */
      excerpt: "My writing will appear here soon.",
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
    <>
      <Navigation navColor="#ffffff" showNav={showNav} links={navLinks} />

      {/* Section 1: Hero */}
      <section className={styles.hero} id="home">
        <div>
          <h1 className={`${styles.heroTitle} fade-in-name`}>Personal Passions</h1>
          <p className={`${styles.heroTagline} fade-in`}>
            Beyond the code — writing, music, and ideas.
          </p>
          <a
            href="mailto:joseph.x.cheng@gmail.com"
            className={styles.contactButton}
          >
            Contact Me
          </a>
          <SocialMediaLinks />
        </div>
        <div
          className={styles.scrollDown}
          onClick={() => scrollToSection("writingSection")}
          aria-label="Scroll Down"
        >
          <span className={styles.scrollArrow}>&#9660;</span>
        </div>
      </section>

      {/* Section 2: Writing & Ideas */}
      <section
        id="writingSection"
        className={styles.writingSection}
        ref={writingSectionRef}
      >
        <h2 className={styles.sectionTitle}>Writing &amp; Ideas</h2>
        <p className={styles.sectionSubtitle}>
          Essays, reflections, and ideas.
        </p>
        <div className={styles.writingGrid}>
          {writingCards.map((card, index) => (
            <div key={index} className={styles.writingCard}>
              <span className={styles.categoryChip}>{card.category}</span>
              <h3 className={styles.cardTitle}>
                {/* TODO: Replace with real title */}
                {card.title}
              </h3>
              <p className={styles.cardExcerpt}>
                {/* TODO: Replace with real excerpt */}
                {card.excerpt}
              </p>
              <span className={styles.readLink}>Read &rarr;</span>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Music */}
      <section id="musicSection" className={styles.musicSection}>
        <h2 className={styles.sectionTitle}>Music</h2>
        <p className={styles.sectionSubtitle}>
          Things I play when I&apos;m not writing code.
        </p>
        <div className={styles.musicGrid}>
          {musicCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div key={index} className={styles.musicCard}>
                <Icon className={styles.musicIcon} />
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDescription}>{card.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 4: Footer */}
      <section className={styles.footerSection}>
        <Link className={styles.backToHome} href="/">
          Back to Home
        </Link>
        <Footer />
      </section>
    </>
  );
}
