// src/app/layout.tsx

"use client";

import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { NavbarProvider } from "./components/NavbarContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      // Apply custom cursor only on the homepage
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

      // Attach event listeners for cursor movement and hover effects
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
      // Restore the default system cursor for other pages
      document.body.style.cursor = "auto";
    }
  }, [pathname]);

  return (
    <html lang="en">
      <body>
        <NavbarProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </NavbarProvider>
      </body>
    </html>
  );
}
