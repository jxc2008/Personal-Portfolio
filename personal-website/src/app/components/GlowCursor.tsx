"use client";

import { useEffect, useRef } from "react";
import styles from "./GlowCursor.module.css";

export default function GlowCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide on touch devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const dot = dotRef.current;
    const glow = glowRef.current;
    if (!dot || !glow) return;

    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;
    let isHovering = false;
    let isSuppressed = false;

    // Regions can opt out with data-glow-cursor="off" (e.g. the homepage hero).
    const updateSuppressed = (target: Element | null) => {
      const off = !!target?.closest('[data-glow-cursor="off"]');
      if (off === isSuppressed) return;
      isSuppressed = off;
      dot.classList.toggle(styles.suppressed, off);
      glow.classList.toggle(styles.suppressed, off);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      updateSuppressed(e.target as Element);
    };

    // Scrolling moves content under a still pointer without a mousemove.
    const onScroll = () => updateSuppressed(document.elementFromPoint(mouseX, mouseY));

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"]')) {
        isHovering = true;
        dot.classList.add(styles.hovering);
        glow.classList.add(styles.hovering);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"]')) {
        isHovering = false;
        dot.classList.remove(styles.hovering);
        glow.classList.remove(styles.hovering);
      }
    };

    let raf: number;
    const animate = () => {
      glowX += (mouseX - glowX) * 0.15;
      glowY += (mouseY - glowY) * 0.15;
      glow.style.transform = `translate(${glowX - 18}px, ${glowY - 18}px)`;
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={styles.dot} />
      <div ref={glowRef} className={styles.glow} />
    </>
  );
}
