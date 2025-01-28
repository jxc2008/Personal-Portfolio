// src/app/components/NavbarContext.tsx

import { createContext, useContext } from "react";

interface NavbarContextType {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

const NavbarContext = createContext<NavbarContextType>({
  isDark: true,
  setIsDark: () => {},
});

export const useNavbarContext = () => useContext(NavbarContext);

export default NavbarContext;
