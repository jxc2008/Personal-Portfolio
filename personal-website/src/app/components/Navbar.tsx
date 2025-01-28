"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import styles from "./Navbar.module.css"

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false)

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
    <nav className={`${styles.navbar} ${isVisible ? styles.visible : ""}`}>
      <div className={styles.navLinks}>
        <Link href="/">Home</Link>
        <Link href="/professional">Professional</Link>
        <Link href="/nonprofessional">Non-Professional</Link>
      </div>
    </nav>
  )
}

export default Navbar

