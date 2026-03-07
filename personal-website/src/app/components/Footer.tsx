// src/app/components/Footer.tsx

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Joseph Cheng. All rights reserved.</p>
    </footer>
  );
}
