import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
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
