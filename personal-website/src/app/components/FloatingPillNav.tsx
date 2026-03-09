"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "./NavbarContext";
import styles from "./FloatingPillNav.module.css";

const mainLinks = [
  { href: "/", label: "Home" },
  { href: "/professional", label: "Projects" },
  { href: "/nonprofessional", label: "Passions" },
];

const sectionAnchors: Record<string, { id: string; label: string }[]> = {
  "/professional": [
    { id: "skillsSection", label: "Skills" },
    { id: "projectsSection", label: "Projects" },
    { id: "experienceSection", label: "Experience" },
  ],
  "/nonprofessional": [
    { id: "writingSection", label: "Writing" },
    { id: "musicSection", label: "Music" },
  ],
};

export default function FloatingPillNav() {
  const pathname = usePathname();
  const { darkMode, toggleDarkMode } = useTheme();

  const anchors = sectionAnchors[pathname] || [];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={styles.pill} aria-label="Main Navigation">
      <div className={styles.inner}>
        {mainLinks.map((link) => (
          <Link key={link.href} href={link.href} className={styles.link}>
            {pathname === link.href && (
              <motion.span
                className={styles.activeIndicator}
                layoutId="pillIndicator"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className={styles.linkText}>{link.label}</span>
          </Link>
        ))}

        {anchors.length > 0 && <span className={styles.divider} />}

        {anchors.map((anchor) => (
          <button
            key={anchor.id}
            className={styles.anchorLink}
            onClick={() => scrollToSection(anchor.id)}
          >
            {anchor.label}
          </button>
        ))}

        <button
          className={styles.themeToggle}
          onClick={toggleDarkMode}
          aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
}
