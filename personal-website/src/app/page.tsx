"use client";

import styles from "./page.module.css";
import Link from "next/link";
import { useTheme } from "./components/NavbarContext";

export default function Home() {
  const { darkMode } = useTheme();

  return (
    <div className={`${styles.container} ${darkMode ? styles.dark : ""}`}>
      {/* Landing Section */}
      <section className={styles.landing}>
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
            <span className={styles.im}>I&apos;m</span>
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
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
            }
          }}
        >
          ↓
        </div>
      </section>

      {/* Split Section: Projects and Passions */}
      <section className={styles.split}>
        {/* Projects Panel */}
        <Link
          href="/professional"
          className={`${styles.professional} ${styles.panelLink}`}
          aria-label="Go to Projects"
        >
          <h2 className="projects">Projects</h2>
        </Link>

        {/* Passions Panel */}
        <Link
          href="/nonprofessional"
          className={`${styles.nonprofessional} ${styles.panelLink}`}
          aria-label="Go to Passions"
        >
          <h2 className="passions">Passions</h2>
        </Link>
      </section>
    </div>
  );
}
