"use client";

import styles from "./page.module.css";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "./components/NavbarContext";
import { fadeInUp } from "./utils/animations";

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
        <motion.div
          className={styles.textContainer}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1>
            <span className={styles.im}>I&apos;m</span>
            <span className={styles.name}>Joseph Cheng</span>
          </h1>
        </motion.div>

        {/* Scroll Arrow */}
        <motion.div
          className={styles.scrollArrow}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
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
        </motion.div>
      </section>

      {/* Split Section: Projects and Passions */}
      <section className={styles.split}>
        {/* Projects Panel */}
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="/professional"
            className={`${styles.professional} ${styles.panelLink}`}
            aria-label="Go to Projects"
          >
            <h2 className="projects">Projects</h2>
          </Link>
        </motion.div>

        {/* Passions Panel */}
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="/nonprofessional"
            className={`${styles.nonprofessional} ${styles.panelLink}`}
            aria-label="Go to Passions"
          >
            <h2 className="passions">Passions</h2>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
