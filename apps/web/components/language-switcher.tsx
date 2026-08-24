"use client";

import { Globe2 } from "lucide-react";
import { useLanguage } from "./language-provider";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage, t } = useLanguage();
  return <div className={`language-switcher${compact ? " language-switcher-compact" : ""}`} aria-label={t("language")}>
    <Globe2 size={14} aria-hidden="true" />
    <button type="button" className={language === "en" ? "language-option active" : "language-option"} onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button>
    <span className="language-divider" aria-hidden="true">/</span>
    <button type="button" className={language === "kn" ? "language-option active" : "language-option"} onClick={() => setLanguage("kn")} aria-pressed={language === "kn"}>ಕನ್ನಡ</button>
  </div>;
}
