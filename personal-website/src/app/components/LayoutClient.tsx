"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { NavbarProvider, useTheme } from "./NavbarContext";
import Navbar from "./Navbar";
import Footer from "./Footer";

function ThemeSync() {
  const { darkMode } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return null;
}

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      const cursor = document.createElement("div");
      cursor.classList.add("custom-cursor");
      document.body.appendChild(cursor);

      const moveCursor = (e: MouseEvent) => {
        cursor.style.top = `${e.clientY}px`;
        cursor.style.left = `${e.clientX}px`;
      };

      const hoverEffect = () => {
        cursor.style.transform = "translate(-50%, -50%) rotate(20deg)";
      };

      const removeHoverEffect = () => {
        cursor.style.transform = "translate(-50%, -50%) rotate(0deg)";
      };

      window.addEventListener("mousemove", moveCursor);

      document.querySelectorAll("a, button, .interactive-element").forEach((el) => {
        el.addEventListener("mouseover", hoverEffect);
        el.addEventListener("mouseout", removeHoverEffect);
      });

      return () => {
        window.removeEventListener("mousemove", moveCursor);
        document.body.removeChild(cursor);

        document.querySelectorAll("a, button, .interactive-element").forEach((el) => {
          el.removeEventListener("mouseover", hoverEffect);
          el.removeEventListener("mouseout", removeHoverEffect);
        });
      };
    } else {
      document.body.style.cursor = "auto";
    }
  }, [pathname]);

  return (
    <NavbarProvider>
      <ThemeSync />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </NavbarProvider>
  );
}
