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
                document.documentElement.classList.remove('dark')
            }
            else {
                document.documentElement.classList.add('dark')
            }
        } catch {

        }

    }, [darkMode, setDarkMode]);

    return { darkMode, toggleDarkMode };
};
