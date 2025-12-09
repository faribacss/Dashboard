import React, { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const LanguageContext = createContext(undefined);

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();

  // initial language: localStorage -> i18n -> fallback 'en'
  const [language, setLanguage] = useState<string>(() => {
    try {
      const stored =
        typeof window !== "undefined" && localStorage.getItem("lang");
      if (stored) return stored;
    } catch {
      // ignore (storage disabled or inaccessible)
    }
    return (i18n && i18n.language) || "en";
  });

  useEffect(() => {
    if (!i18n) return;
    i18n.changeLanguage(language).catch(() => {
      /* ignore */
    });
    try {
      localStorage.setItem("lang", language);
    } catch {
      // ignore (storage disabled)
    }
  }, [i18n, language]);

  const changeLanguage = (lang) => setLanguage(lang);

  const isPersian = String(language).startsWith("fa");

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, isPersian }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const LanguageRoot = ({ children }) => {
  const ctx = useContext(LanguageContext);
  if (!ctx)
    throw new Error("LanguageRoot must be used within LanguageProvider");
  const { language } = ctx;
  const dir = String(language).startsWith("fa") ? "rtl" : "ltr";
  const fontClass = String(language).startsWith("fa") ? "fa" : "";

  return (
    <div
      lang={language}
      dir={dir}
      className={`lang-root ${fontClass}`}
      style={{ minHeight: "100%" }}
    >
      {children}
    </div>
  );
};
