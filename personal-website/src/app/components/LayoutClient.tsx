"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { NavbarProvider, useTheme } from "./NavbarContext";
import FloatingPillNav from "./FloatingPillNav";
import GlowCursor from "./GlowCursor";
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

  return (
    <NavbarProvider>
      <ThemeSync />
      <GlowCursor />
      <FloatingPillNav />
      <AnimatePresence mode="wait">
        <motion.main
          id="main-content"
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </NavbarProvider>
  );
}
