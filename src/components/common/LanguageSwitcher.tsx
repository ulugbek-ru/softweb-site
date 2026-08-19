"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Globe } from "lucide-react";
import { Locale, LOCALES } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  currentLang: Locale;
  compact?: boolean;
}

const languageLabels: Record<Locale, { label: string; flag: string }> = {
  uz: { label: "O‘zbekcha", flag: "🇺🇿" },
  ru: { label: "Русский", flag: "🇷🇺" },
  en: { label: "English", flag: "🇬🇧" },
};

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLang,
  compact = false,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchLanguage = (targetLang: Locale) => {
    setIsOpen(false);
    if (targetLang === currentLang) return;

    // Replace current locale prefix cleanly
    let newPath = pathname;
    const currentPrefix = `/${currentLang}`;

    if (newPath.startsWith(currentPrefix)) {
      newPath = newPath.replace(currentPrefix, `/${targetLang}`);
    } else {
      newPath = `/${targetLang}${newPath === "/" ? "" : newPath}`;
    }

    // Retain hash if present
    if (typeof window !== "undefined" && window.location.hash) {
      newPath += window.location.hash;
    }

    router.push(newPath);
  };

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 p-1 rounded-xl dark:bg-surface-dark-100 bg-slate-100 border dark:border-white/10 border-slate-200">
        {LOCALES.map((lang) => {
          const isActive = lang === currentLang;
          return (
            <button
              key={lang}
              onClick={() => switchLanguage(lang)}
              className={cn(
                "px-2.5 py-1 text-xs font-mono font-bold rounded-lg transition-all",
                isActive
                  ? "bg-brand-green text-white shadow-sm"
                  : "dark:text-zinc-400 text-slate-600 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              {lang.toUpperCase()}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold dark:bg-surface-dark-100/90 bg-white dark:border-white/10 border-slate-200 border dark:text-zinc-200 text-slate-700 hover:border-brand-green transition-all shadow-sm"
        aria-label="Switch Language"
      >
        <span className="text-sm">{languageLabels[currentLang].flag}</span>
        <span>{currentLang.toUpperCase()}</span>
        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-40 rounded-2xl dark:bg-surface-dark-100 bg-white border dark:border-white/10 border-slate-200 shadow-2xl p-1.5 z-50 overflow-hidden"
          >
            {LOCALES.map((lang) => {
              const isActive = lang === currentLang;
              return (
                <button
                  key={lang}
                  onClick={() => switchLanguage(lang)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 text-xs font-mono rounded-xl transition-all",
                    isActive
                      ? "bg-brand-green/10 text-brand-green font-bold"
                      : "dark:text-zinc-300 text-slate-700 dark:hover:bg-white/5 hover:bg-slate-100"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{languageLabels[lang].flag}</span>
                    <span>{languageLabels[lang].label}</span>
                  </div>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
