// src/app/components/Navigation.tsx

"use client";

import React from "react";
import styles from "./Navigation.module.css";

interface NavLink {
  label: string;
  sectionId: string;
}

const defaultLinks: NavLink[] = [
  { label: "Top", sectionId: "home" },
  { label: "Projects", sectionId: "projectsSection" },
  { label: "Experience", sectionId: "experienceSection" },
];

interface NavigationProps {
  navColor: string;
  showNav?: boolean;
  links?: NavLink[];
}

export default function Navigation({
  navColor,
  showNav = true,
  links = defaultLinks,
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
        {links.map((link) => (
          <li key={link.sectionId}>
            <a
              href={`#${link.sectionId}`}
              className={styles.navLink}
              style={{ color: navColor }}
              onClick={(e) => handleClick(e, link.sectionId)}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
