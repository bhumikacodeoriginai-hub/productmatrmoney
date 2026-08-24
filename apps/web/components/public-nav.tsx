"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Brand } from "./ui";

export function PublicNav() {
  const [open, setOpen] = useState(false);
  return <header className="public-nav"><div className="container public-nav-inner"><Brand /><nav className={open ? "nav-links nav-links-open" : "nav-links"} aria-label="Primary navigation"><Link href="/discover" className="nav-link">Discover</Link><Link href="/#how-it-works" className="nav-link">How it works</Link><Link href="/membership" className="nav-link">Membership</Link><Link href="/safety" className="nav-link">Safety</Link><Link href="/about" className="nav-link">About</Link></nav><div className="nav-actions"><Link href="/login" className="btn btn-ghost">Log in</Link><Link href="/onboarding" className="btn btn-primary">Create profile</Link><button className="icon-btn mobile-menu" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X size={19} /> : <Menu size={19} />}</button></div></div></header>;
}
