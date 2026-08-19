import uzDict from "@/messages/uz.json";
import ruDict from "@/messages/ru.json";
import enDict from "@/messages/en.json";

export type Locale = "uz" | "ru" | "en";

export const LOCALES: Locale[] = ["uz", "ru", "en"];
export const DEFAULT_LOCALE: Locale = "uz";

export type Dictionary = typeof uzDict;

const dictionaries: Record<Locale, Dictionary> = {
  uz: uzDict,
  ru: ruDict as unknown as Dictionary,
  en: enDict as unknown as Dictionary,
};

export function isValidLocale(lang: string): lang is Locale {
  return LOCALES.includes(lang as Locale);
}

export function getDictionary(lang: string): Dictionary {
  if (isValidLocale(lang)) {
    return dictionaries[lang];
  }
  return dictionaries[DEFAULT_LOCALE];
}

/**
 * Safely resolves nested keys like "hero.titleLine1"
 */
export function getTranslation(dict: Dictionary, path: string): string {
  const keys = path.split(".");
  let current: any = dict;
  for (const k of keys) {
    if (current && typeof current === "object" && k in current) {
      current = current[k];
    } else {
      return path; // Fallback to key path if missing
    }
  }
  return typeof current === "string" ? current : path;
}
