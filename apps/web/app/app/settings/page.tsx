"use client";

import { useState } from "react";
import { Bell, ChevronRight, Eye, Globe2, LockKeyhole, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/components/language-provider";

const rows = [
  { key:"security", icon:LockKeyhole, title:"Account & security", text:"Password, login sessions and account recovery" },
  { key:"privacy", icon:Eye, title:"Privacy & photo controls", text:"Who can find you and view your photos" },
  { key:"notifications", icon:Bell, title:"Notification preferences", text:"Choose what you hear about" },
  { key:"language", icon:Globe2, title:"Language", text:"English (India)" },
  { key:"blocked", icon:ShieldCheck, title:"Blocked members", text:"Manage members you’ve blocked" },
];

export default function Settings() {
  const [done, setDone] = useState("");
  const { language, t } = useLanguage();
  const languageText = language === "en" ? t("englishIndia") : t("kannada");
  return <AppShell active="Home"><div className="side-card" style={{ padding:0, overflow:"hidden" }}>{rows.map(row => { const Icon = row.icon; if (row.key === "language") return <div key={row.key} style={{ display:"flex", alignItems:"center", gap:14, width:"100%", padding:19, borderBottom:"1px solid var(--line)", background:"#fff" }}><span className="feature-icon" style={{ width:38, height:38, margin:0 }}><Icon size={17}/></span><span style={{ flex:1 }}><strong style={{ display:"block", fontSize:13 }}>{t("language")}</strong><span className="muted" style={{ display:"block", fontSize:11, marginTop:4 }}>{languageText}</span></span><LanguageSwitcher compact /></div>; return <button key={row.key} onClick={() => setDone(`${row.title} opened`)} style={{ display:"flex", alignItems:"center", gap:14, width:"100%", padding:19, border:0, borderBottom:"1px solid var(--line)", background:"#fff", textAlign:"left" }}><span className="feature-icon" style={{ width:38, height:38, margin:0 }}><Icon size={17}/></span><span style={{ flex:1 }}><strong style={{ display:"block", fontSize:13 }}>{row.title}</strong><span className="muted" style={{ display:"block", fontSize:11, marginTop:4 }}>{row.text}</span></span><ChevronRight size={16} color="#a0a6b5"/></button>; })}</div>{done&&<p role="status" className="muted" style={{ fontSize:12, marginTop:14 }}>{done} · UI ready for detailed settings flow.</p>}</AppShell>;
}
