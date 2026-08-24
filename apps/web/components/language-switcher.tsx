"use client";

import { Globe2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "./language-provider";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage, t } = useLanguage();
  const [changed, setChanged] = useState(false);
  useEffect(() => { if (!changed) return; const timer = window.setTimeout(() => setChanged(false), 900); return () => window.clearTimeout(timer); }, [changed]);
  const choose = (next: "en" | "kn") => { if (next === language) return; setLanguage(next); setChanged(true); };
  return <div className={`language-switcher${compact ? " language-switcher-compact" : ""}${changed ? " language-switcher-changed" : ""}`} aria-label={t("language")}>
    <Globe2 size={14} aria-hidden="true" />
    {!compact && <span className="language-current">{language === "en" ? "English" : "ಕನ್ನಡ"}</span>}
    <button type="button" className={language === "en" ? "language-option active" : "language-option"} onClick={() => choose("en")} aria-pressed={language === "en"}>EN</button>
    <span className="language-divider" aria-hidden="true">/</span>
    <button type="button" className={language === "kn" ? "language-option active" : "language-option"} onClick={() => choose("kn")} aria-pressed={language === "kn"}>ಕನ್ನಡ</button>
    {changed && <Sparkles className="language-spark" size={12} aria-hidden="true" />}
  </div>;
}
