import React, { createContext, useContext, useEffect, useState } from "react";
import { translations } from "../constants/translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem("portfolio_lang");
    return saved === "en" ? "en" : "id";
  });

  useEffect(() => {
    localStorage.setItem("portfolio_lang", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "id" ? "en" : "id"));
  };

  const t = translations[language] || translations.id;

  return (
    <LanguageContext.Provider
      value={{
        language,
        isID: language === "id",
        isEN: language === "en",
        setLanguage,
        toggleLanguage,
        t
      }}
    >
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
