// src/app/components/SocialMediaLinks.tsx

import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import styles from './SocialMediaLinks.module.css';

const SocialMediaLinks = () => {
  return (
    <div className={styles.socialMediaContainer}>
      <a
        href="https://github.com/jxc2008"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className={styles.socialLink}
      >
        <FaGithub />
      </a>
      <a
        href="https://www.linkedin.com/in/joseph-cheng-b03886296/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className={styles.socialLink}
      >
        <FaLinkedin />
      </a>
      <a
        href="https://www.instagram.com/koioseph_/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className={styles.socialLink}
      >
        <FaInstagram />
      </a>
    </div>
  );
};

export default SocialMediaLinks;
