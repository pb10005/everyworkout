"use client";
import { useState, useEffect } from "react";

export const useDarkMode = () => {
    const [darkMode, setDarkMode] = useState((): string => {
        return localStorage.getItem('darkMode') || '';
    });

    const toggleDarkMode = (): void => {
        const darkMode = localStorage.getItem('darkMode') || '';
        if (darkMode === 'dark') {
            setDarkMode('');
        }
        else {
            setDarkMode('dark');
        }
    };

    // stateとlocalStorageを同期する
    useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
        if (darkMode === 'dark') {
            document.documentElement.classList.remove('dark')
        }
        else {
            document.documentElement.classList.add('dark')
        }

    }, [darkMode, setDarkMode]);

    return { darkMode, toggleDarkMode };
};
