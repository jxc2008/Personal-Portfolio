// src/app/components/NavbarContext.tsx

"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface NavbarContextType {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const NavbarContext = createContext<NavbarContextType>({
  isDark: true,
  setIsDark: () => {},
  darkMode: false,
  toggleDarkMode: () => {},
});

export function NavbarProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true);
  const [darkMode, setDarkMode] = useState(
    () => typeof window !== "undefined" && localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <NavbarContext.Provider value={{ isDark, setIsDark, darkMode, toggleDarkMode }}>
      {children}
    </NavbarContext.Provider>
  );
}

export const useNavbarContext = () => useContext(NavbarContext);
export const useTheme = () => useContext(NavbarContext);

export default NavbarContext;
