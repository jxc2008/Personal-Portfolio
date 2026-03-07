"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa"
import { useTheme } from "./NavbarContext"
import styles from "./Navbar.module.css"

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false)
  const { darkMode, toggleDarkMode } = useTheme()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(e.clientX < 50)
    }

    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <>
      <button
        className={styles.hamburger}
        onClick={() => setIsVisible(v => !v)}
        aria-label="Toggle navigation"
      >
        {isVisible ? <FaTimes /> : <FaBars />}
      </button>
      <nav className={`${styles.navbar} ${isVisible ? styles.visible : ""}`}>
        <div className={styles.navLinks}>
        <Link href="/">Home</Link>
        <Link href="/professional">Professional</Link>
        <Link href="/nonprofessional">Non-Professional</Link>
        <button
          className={styles.themeToggle}
          onClick={toggleDarkMode}
          aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
      </nav>
    </>
  )
}

export default Navbar

