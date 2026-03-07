import Link from "next/link";
import styles from "./NonProfessional.module.css";

export default function NonProfessional() {
  return (
    <div className={`${styles.container} fade-in`}>
      {/* Back to Home Button */}
      <Link href="/">
        <button className={styles.backToHome}>Back to Home</button>
      </Link>
      <div>
        <h1 className={styles.header}>Non-Professional Side</h1>
        <p className={styles.content}>
          Welcome to the non-professional side! Here, you’ll find my hobbies,
          music, creative writing, and other personal interests.
        </p>
        <a href="mailto:joseph.x.cheng@gmail.com" className={styles.contactButton}>Contact Me</a>
      </div>
    </div>
  );
}
