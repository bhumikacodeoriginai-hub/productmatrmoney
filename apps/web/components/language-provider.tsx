"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translateText } from "./language-catalog";

export type Language = "en" | "kn";
type LanguageKey = keyof typeof copy.en;
type LanguageContextValue = { language: Language; setLanguage: (language: Language) => void; t: (key: LanguageKey) => string; translate: (value: string) => string };

const copy = {
  en: {
    discover: "Discover", howItWorks: "How it works", membership: "Membership", safety: "Safety", about: "About", logIn: "Log in", createProfile: "Create profile", home: "Home", matches: "Matches", interests: "Interests", shortlisted: "Shortlisted", messages: "Messages", viewedMe: "Who viewed me", myProfile: "My profile", settings: "Settings", safetyCenter: "Safety center", language: "Language", englishIndia: "English (India)", kannada: "ಕನ್ನಡ", goodMorning: "Good morning, Ananya", homeSubtitle: "We found 14 profiles matching your preferences today.", meaningfulConnections: "Take your time. Meaningful connections have no shortcuts.", beginJourney: "Begin your journey", privacyInclusive: "Privacy-first · Inclusive by design",
  },
  kn: {
    discover: "ಅನ್ವೇಷಿಸಿ", howItWorks: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ", membership: "ಸದಸ್ಯತ್ವ", safety: "ಸುರಕ್ಷತೆ", about: "ನಮ್ಮ ಬಗ್ಗೆ", logIn: "ಲಾಗ್ ಇನ್", createProfile: "ಪ್ರೊಫೈಲ್ ರಚಿಸಿ", home: "ಮುಖಪುಟ", matches: "ಹೊಂದಾಣಿಕೆಗಳು", interests: "ಆಸಕ್ತಿಗಳು", shortlisted: "ಆಯ್ಕೆಪಟ್ಟಿ", messages: "ಸಂದೇಶಗಳು", viewedMe: "ನನ್ನನ್ನು ನೋಡಿದವರು", myProfile: "ನನ್ನ ಪ್ರೊಫೈಲ್", settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು", safetyCenter: "ಸುರಕ್ಷತಾ ಕೇಂದ್ರ", language: "ಭಾಷೆ", englishIndia: "ಇಂಗ್ಲಿಷ್ (ಭಾರತ)", kannada: "ಕನ್ನಡ", goodMorning: "ಶುಭೋದಯ, ಅನನ್ಯಾ", homeSubtitle: "ನಿಮ್ಮ ಆದ್ಯತೆಗಳಿಗೆ ಹೊಂದುವ 14 ಪ್ರೊಫೈಲ್‌ಗಳನ್ನು ಕಂಡುಕೊಂಡಿದ್ದೇವೆ.", meaningfulConnections: "ನಿಧಾನವಾಗಿ ಮುಂದುವರಿಯಿರಿ. ಅರ್ಥಪೂರ್ಣ ಸಂಬಂಧಗಳಿಗೆ ಆತುರವಿಲ್ಲ.", beginJourney: "ನಿಮ್ಮ ಪ್ರಯಾಣ ಆರಂಭಿಸಿ", privacyInclusive: "ಗೌಪ್ಯತೆ ಮೊದಲು · ಎಲ್ಲರನ್ನೂ ಒಳಗೊಂಡ ವಿನ್ಯಾಸ",
  },
} as const;

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = "advaita-language";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "kn") setLanguage(saved);
    } catch {
      // Storage can be disabled by privacy settings; language still works in memory.
    } finally {
      setReady(true);
    }
  }, []);
  useEffect(() => {
    document.documentElement.lang = language;
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Keep the selected language for this session when persistence is unavailable.
    }
  }, [language, ready]);
  const value = useMemo(() => ({ language, setLanguage, t: (key: LanguageKey) => copy[language][key], translate: (value: string) => translateText(value, language) }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
