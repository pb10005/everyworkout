'use client';

import { createContext } from "react";
import { useDarkMode } from "../src/hooks/useDarkMode";

export interface ThemeProviderProps {
    children: React.ReactNode;
}
const ThemeContext = createContext({});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const { darkMode } = useDarkMode();

    return <ThemeContext.Provider value={darkMode}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
