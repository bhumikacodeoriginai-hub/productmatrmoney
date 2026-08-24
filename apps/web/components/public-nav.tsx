"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Brand } from "./ui";
import { LanguageSwitcher } from "./language-switcher";
import { useLanguage } from "./language-provider";

export function PublicNav() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  return <header className="public-nav"><div className="container public-nav-inner"><Brand /><nav className={open ? "nav-links nav-links-open" : "nav-links"} aria-label="Primary navigation"><Link href="/discover" className="nav-link">{t("discover")}</Link><Link href="/#how-it-works" className="nav-link">{t("howItWorks")}</Link><Link href="/membership" className="nav-link">{t("membership")}</Link><Link href="/safety" className="nav-link">{t("safety")}</Link><Link href="/about" className="nav-link">{t("about")}</Link></nav><div className="nav-actions"><LanguageSwitcher compact /><Link href="/login" className="btn btn-ghost">{t("logIn")}</Link><Link href="/onboarding" className="btn btn-primary">{t("createProfile")}</Link><button className="icon-btn mobile-menu" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X size={19} /> : <Menu size={19} />}</button></div></div></header>;
}
