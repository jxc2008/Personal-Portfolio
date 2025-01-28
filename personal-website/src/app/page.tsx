// src/app/page.tsx

"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`${styles.container} ${darkMode ? styles.dark : ""}`}>
      {/* Dark Mode Toggle */}
      <button
        className={styles.darkModeToggle}
        onClick={toggleDarkMode}
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      {/* Landing Section */}
      <section className={styles.landing}>
        {/* Sun (Light Mode) */}
        {!darkMode && <div className={styles.sun}></div>}

        {/* Crescent Moon (Dark Mode) */}
        {darkMode && <div className={styles.moon}></div>}

        {/* Stars (only in dark mode) */}
        {darkMode && (
          <>
            <div className={`${styles.star} ${styles.star1}`}></div>
            <div className={`${styles.star} ${styles.star2}`}></div>
            <div className={`${styles.star} ${styles.star3}`}></div>
            <div className={styles.shootingStar}></div>
          </>
        )}

        {/* Clouds */}
        <div className={`${styles.cloud} ${styles.cloud1}`}></div>
        <div className={`${styles.cloud} ${styles.cloud2}`}></div>
        <div className={`${styles.cloud} ${styles.cloud3}`}></div>

        {/* Text Content */}
        <div className={styles.textContainer}>
          <h1>
            <span className={styles.im}>I&apos;m</span> {/* Escaped */}
            <span className={`${styles.name} fade-in-name`}>Joseph Cheng</span>
          </h1>
        </div>

        {/* Scroll Arrow */}
        <div
          className={styles.scrollArrow}
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
          aria-label="Scroll Down"
        >
          ↓
        </div>
      </section>

      {/* Split Section: Projects and Passions */}
      <section className={styles.split}>
        <div className={styles.professional}>
          <Link href="/professional">
            <h2 className="projects">Projects</h2>
          </Link>
        </div>
        <div className={styles.nonprofessional}>
          <Link href="/nonprofessional">
            <h2 className="passions">Passions</h2>
          </Link>
        </div>
      </section>
    </div>
  );
}
