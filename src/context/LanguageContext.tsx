"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { KBizTranslations } from "../constants/translations";

type LanguageContextType = {
  locale: string;
  t: (keyPath: string, defaultValue?: string) => string;
  changeLanguage: (newLocale: string) => void;
  isRtl: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const SUPPORTED_LOCALES = [
  "en", "ko", "ja", "zh-CN", "zh-TW", "vi", "th", "id", "ar", "es", "fr", "de", "pt", "hi"
] as const;

export const LOCALE_NAMES: Record<string, string> = {
  en: "English",
  ko: "한국어",
  ja: "日本語",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
  vi: "Tiếng Việt",
  th: "ไทย",
  id: "Bahasa Indonesia",
  ar: "العربية",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  pt: "Português",
  hi: "हिन्दी"
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  // Extract locale from path
  const currentLocale = (params?.locale as string) || "en";
  const locale = SUPPORTED_LOCALES.includes(currentLocale as any) ? currentLocale : "en";
  const isRtl = locale === "ar";

  // Ensure HTML dir and lang attributes are updated on mount and locale changes
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
  }, [locale, isRtl]);

  // Nested translations lookup (e.g. t("nav.home"))
  const t = (keyPath: string, defaultValue?: string): string => {
    const keys = keyPath.split(".");
    let current = KBizTranslations[locale];

    for (const key of keys) {
      if (current && typeof current === "object" && key in current) {
        current = current[key];
      } else {
        // Fallback to English
        let fallback = KBizTranslations["en"];
        for (const fallbackKey of keys) {
          if (fallback && typeof fallback === "object" && fallbackKey in fallback) {
            fallback = fallback[fallbackKey];
          } else {
            fallback = undefined;
            break;
          }
        }
        return (typeof fallback === "string" ? fallback : defaultValue || keyPath);
      }
    }

    return typeof current === "string" ? current : defaultValue || keyPath;
  };

  const changeLanguage = (newLocale: string) => {
    if (!SUPPORTED_LOCALES.includes(newLocale as any)) return;
    
    // Replace current locale segment in the pathname
    const segments = pathname.split("/");
    if (segments.length > 1 && SUPPORTED_LOCALES.includes(segments[1] as any)) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    
    const newPath = segments.join("/");
    router.push(newPath || `/${newLocale}`);
  };

  return (
    <LanguageContext.Provider value={{ locale, t, changeLanguage, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
