// src/app/components/Navigation.tsx

"use client";

import React from "react";
import styles from "./Navigation.module.css";

interface NavigationProps {
  navColor: string;
  showNav?: boolean; // Marked as optional to handle cases where it's not explicitly passed
}

export default function Navigation({
  navColor,
  showNav = true, // Default to true if not provided
}: NavigationProps) {
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    sectionId: string
  ) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`${styles.navbar} ${showNav ? styles.visible : styles.hidden}`}
      aria-label="Main Navigation"
    >
      <ul className={styles.navLinks}>
        <li>
          <a
            href="#home"
            className={styles.navLink}
            style={{ color: navColor }}
            onClick={(e) => handleClick(e, "home")}
          >
            Top
          </a>
        </li>
        <li>
          <a
            href="#projectsSection"
            className={styles.navLink}
            style={{ color: navColor }}
            onClick={(e) => handleClick(e, "projectsSection")}
          >
            Projects
          </a>
        </li>
        <li>
          <a
            href="#experienceSection"
            className={styles.navLink}
            style={{ color: navColor }}
            onClick={(e) => handleClick(e, "experienceSection")}
          >
            Experience
          </a>
        </li>
      </ul>
    </nav>
  );
}
