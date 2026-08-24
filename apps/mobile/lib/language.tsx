import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "en" | "kn";
type LanguageKey = keyof typeof copy.en;
type LanguageContextValue = { language: Language; setLanguage: (language: Language) => void; t: (key: LanguageKey) => string };

const copy = {
  en: {
    home: "Home",
    discover: "Discover",
    matches: "Matches",
    messages: "Messages",
    profile: "Profile",
    language: "Language",
    englishIndia: "English (India)",
    kannada: "ಕನ್ನಡ",
    beginJourney: "Begin your journey",
    privacyInclusive: "Privacy-first · Inclusive by design",
    tagline: "Where hearts meet, lives belong.",
    kannadaTagline: "ಮನಗಳು ಸೇರುವ, ಬದುಕುಗಳು ಬೆಸೆಯುವ ತಾಣ.",
    yourProfile: "YOUR PROFILE",
    identityVerified: "Identity verified",
    identityCopy: "Your profile is visible to verified members.",
    privacyControls: "Privacy controls",
    privacyCopy: "You choose what to share and when.",
  },
  kn: {
    home: "ಮುಖಪುಟ",
    discover: "ಹುಡುಕಿ",
    matches: "ಹೊಂದಾಣಿಕೆಗಳು",
    messages: "ಸಂದೇಶಗಳು",
    profile: "ಪ್ರೊಫೈಲ್",
    language: "ಭಾಷೆ",
    englishIndia: "ಇಂಗ್ಲಿಷ್ (ಭಾರತ)",
    kannada: "ಕನ್ನಡ",
    beginJourney: "ನಿಮ್ಮ ಪ್ರಯಾಣ ಆರಂಭಿಸಿ",
    privacyInclusive: "ಗೌಪ್ಯತೆ ಮೊದಲು · ಎಲ್ಲರನ್ನೂ ಒಳಗೊಂಡ ವಿನ್ಯಾಸ",
    tagline: "ಮನಗಳು ಸೇರುವ, ಬದುಕುಗಳು ಬೆಸೆಯುವ ತಾಣ.",
    kannadaTagline: "ಮನಗಳು ಸೇರುವ, ಬದುಕುಗಳು ಬೆಸೆಯುವ ತಾಣ.",
    yourProfile: "ನಿಮ್ಮ ಪ್ರೊಫೈಲ್",
    identityVerified: "ಗುರುತು ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
    identityCopy: "ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಪರಿಶೀಲಿತ ಸದಸ್ಯರಿಗೆ ಗೋಚರಿಸುತ್ತದೆ.",
    privacyControls: "ಗೌಪ್ಯತಾ ನಿಯಂತ್ರಣಗಳು",
    privacyCopy: "ಏನು ಮತ್ತು ಯಾವಾಗ ಹಂಚಿಕೊಳ್ಳಬೇಕು ಎಂಬುದು ನಿಮ್ಮ ಆಯ್ಕೆ.",
  },
} as const;

const STORAGE_KEY = "advaita-language";
const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [ready, setReady] = useState(false);
  useEffect(() => { AsyncStorage.getItem(STORAGE_KEY).then(saved => { if (saved === "en" || saved === "kn") setLanguage(saved); setReady(true); }).catch(() => setReady(true)); }, []);
  useEffect(() => { if (ready) void AsyncStorage.setItem(STORAGE_KEY, language).catch(() => undefined); }, [language, ready]);
  const value = useMemo(() => ({ language, setLanguage, t: (key: LanguageKey) => copy[language][key] }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
