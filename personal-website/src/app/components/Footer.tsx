import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { paletteVars, type Region } from "@/regions";
import themes from "@/regions/themes.module.css";
import styles from "./Footer.module.css";

/** On a region page, the footer takes that region's page colours (paper and ink) in both themes. */
export default function Footer({ region }: { region?: Region }) {
  return (
    <footer
      className={region ? `${styles.footer} ${themes.theme} ${styles.regional}` : styles.footer}
      data-region={region?.slug}
      style={region ? paletteVars(region) : undefined}
    >
      <div className={styles.socials}>
        <a href="https://github.com/jxc2008" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/joseph-cheng-b03886296/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FaLinkedin />
        </a>
        <a href="https://www.instagram.com/koioseph_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FaInstagram />
        </a>
      </div>
      <p>&copy; {new Date().getFullYear()} Joseph Cheng. All rights reserved.</p>
    </footer>
  );
}
