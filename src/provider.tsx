"use client";
import React from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { resources } from "./data/i18n/i18n";
import { ThemeProvider } from "next-themes";

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "ja",
        interpolation: {
            escapeValue: false,
        },
    });

export function Provider({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" disableTransitionOnChange defaultTheme="dark" enableSystem>
            {children}
        </ThemeProvider>
    );
}
