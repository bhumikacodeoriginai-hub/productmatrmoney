"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Heart, MoreHorizontal, ShieldCheck, Star, UserRoundPlus } from "lucide-react";
import { Profile } from "@/lib/mock-data";

export function Brand({ dark = false }: { dark?: boolean }) {
  return <Link href="/" className="brand" aria-label="Advaita Matrimony home"><span className="brand-mark"><Heart size={17} fill="currentColor" strokeWidth={1.8} /></span><span style={dark ? { color: "#fff" } : undefined}>Advaita Matrimony</span></Link>;
}

export function VerifiedBadge({ label = "Verified" }: { label?: string }) {
  return <span className="pill pill-verified"><ShieldCheck size={13} /> {label}</span>;
}

export function PremiumBadge() { return <span className="pill pill-premium"><Star size={12} fill="currentColor" /> Premium</span>; }

export function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return <div role="status" style={{ position:"fixed", zIndex:80, right:20, bottom:20, display:"flex", gap:10, alignItems:"center", padding:"13px 16px", color:"#fff", background:"#18233d", borderRadius:12, boxShadow:"0 15px 35px rgba(24,35,61,.2)", fontSize:13 }}><Check size={16} color="#7ee0cf" /> {message}<button onClick={onClose} aria-label="Dismiss notification" style={{ border:0, background:"none", color:"#aeb7ca", marginLeft:8 }}>×</button></div>;
}

export function ProfileCard({ profile, compact = false }: { profile: Profile; compact?: boolean }) {
  const [saved, setSaved] = useState(false);
  const [sent, setSent] = useState(false);
  return <article className="profile-card">
    <div className="profile-image-wrap">
      <img src={profile.image} alt={`${profile.name}, ${profile.age}, ${profile.city}`} loading="lazy" />
      <VerifiedBadge />
      <button className="icon-btn profile-heart" aria-label={`${saved ? "Remove" : "Add"} ${profile.name} ${saved ? "from " : "to "} shortlist`} onClick={() => setSaved(!saved)}><Star size={17} fill={saved ? "currentColor" : "none"} /></button>
    </div>
    <div className="profile-body">
      <div className="profile-title"><div><h3>{profile.name}</h3><small>{profile.age} · {profile.city}</small></div><span style={{ color:"var(--teal)", fontWeight:800, fontSize:12 }}>{profile.compatibility}%</span></div>
      <div className="profile-meta">{profile.profession}<br />{profile.education}</div>
      {!compact && <div className="profile-tags">{profile.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}</div>}
      <button className={`btn ${sent ? "btn-soft" : "btn-primary"} profile-action`} onClick={() => setSent(!sent)}>{sent ? <><Check size={15} /> Interest Sent</> : <><Heart size={15} /> Send Interest</>}</button>
    </div>
  </article>;
}

export function EmptyState({ icon: Icon = Heart, title, description, action }: { icon?: typeof Heart; title: string; description: string; action?: string }) {
  return <div style={{ textAlign:"center", padding:"72px 20px", border:"1px dashed #dfe1eb", borderRadius:18, background:"#fff" }}><span style={{ width:52, height:52, display:"grid", placeItems:"center", margin:"0 auto 16px", color:"var(--plum)", background:"var(--lavender)", borderRadius:"50%" }}><Icon size={22} /></span><h3 style={{ margin:"0 0 8px", fontSize:18 }}>{title}</h3><p className="muted" style={{ margin:"0 auto 20px", maxWidth:350, fontSize:13, lineHeight:1.6 }}>{description}</p>{action && <button className="btn btn-primary">{action}</button>}</div>;
}

export function PageLoader() { return <div style={{ minHeight:"100vh", display:"grid", placeItems:"center", color:"var(--plum)" }} aria-label="Loading"><Heart size={28} fill="currentColor" /></div>; }
