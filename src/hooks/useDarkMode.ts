"use client";
import { useState, useEffect } from "react";

export const useDarkMode = () => {
    const [darkMode, setDarkMode] = useState((): string => {
        try {
            return window.localStorage.getItem('darkMode') || '';
        } catch {
            return '';
        }
    });

    // darkModeを切り替える
    const toggleDarkMode = (): void => {
        try {
            const darkMode = window.localStorage.getItem('darkMode') || '';
            if (darkMode === 'dark') {
                setDarkMode('');
            }
            else {
                setDarkMode('dark');
            }
        } catch {}
    };

    // stateとlocalStorageを同期する
    useEffect(() => {
        try {
            window.localStorage.setItem('darkMode', darkMode);
            if (darkMode === 'dark') {
                document.documentElement.classList.add('dark')
            }
            else {
                document.documentElement.classList.remove('dark')
            }
        } catch {}

    }, [darkMode, setDarkMode]);

    return { darkMode, toggleDarkMode };
};
