"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, Heart, Image as ImageIcon, Pause, Play, ShieldCheck, Star, Video } from "lucide-react";
import { Profile, ProfileMedia } from "@/lib/mock-data";

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

export function MediaPreview({ media, className = "", showControls = true, autoPlay = false }: { media: ProfileMedia[]; className?: string; showControls?: boolean; autoPlay?: boolean }) {
  const item = media[0];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(autoPlay && item?.kind === "video");
  useEffect(() => { if (item?.kind === "video" && videoRef.current) { if (playing) void videoRef.current.play().catch(() => undefined); else videoRef.current.pause(); } }, [item?.kind, playing]);
  if (!item) return null;
  return <div className={`media-preview ${className}`}>
    {item.kind === "video" ? <video ref={videoRef} className="media-preview-element" src={item.src} poster={item.poster} muted loop playsInline autoPlay={autoPlay} preload={autoPlay ? "metadata" : "none"} aria-label={item.alt} /> : <img className="media-preview-element" src={item.src} alt={item.alt} loading="lazy" decoding="async" />}
    <div className="media-preview-shade" />
    <div className="media-preview-meta"><span className="pill pill-quiet media-kind-pill">{item.kind === "video" ? <><Video size={12} /> Intro video</> : <><Star size={12} /> Profile photo</>}</span>{item.visibility !== "public" && <span className="pill pill-premium">{item.visibility === "accepted" ? "Shared after connecting" : "Request to view"}</span>}</div>
    {item.kind === "video" && showControls && <button className="media-play" onClick={() => setPlaying(!playing)} aria-label={playing ? "Pause profile intro" : "Play profile intro"}>{playing ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}</button>}
    {item.duration && <span className="media-duration">{item.duration}</span>}
  </div>;
}

export function ProfileCard({ profile, compact = false }: { profile: Profile; compact?: boolean }) {
  const [saved, setSaved] = useState(false);
  const [sent, setSent] = useState(false);
  const media = profile.media?.length ? profile.media : [{ id:`${profile.id}-image`, kind:"image" as const, src:profile.image, alt:`${profile.name}, ${profile.age}, ${profile.city}`, visibility:"public" as const }];
  return <article className="profile-card">
    <div className="profile-image-wrap"><MediaPreview media={media} /><span className="profile-media-count"><ImageIcon size={12} /> {media.length}</span><VerifiedBadge /><button className="icon-btn profile-heart" aria-label={`${saved ? "Remove" : "Add"} ${profile.name} ${saved ? "from " : "to "} shortlist`} onClick={() => setSaved(!saved)}><Star size={17} fill={saved ? "currentColor" : "none"} /></button></div>
    <div className="profile-body">
      <div className="profile-title"><div><Link href={`/app/profile/${profile.id}`}><h3>{profile.name}</h3></Link><small>{profile.age} · {profile.city}</small></div><span style={{ color:"var(--teal)", fontWeight:800, fontSize:12 }}>{profile.compatibility}%</span></div>
      <div className="profile-meta">{profile.profession}<br />{profile.education}</div>
      {!compact && <div className="profile-tags">{profile.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}{profile.media?.some(item => item.kind === "video") && <span className="tag tag-media"><Video size={11} /> Video intro</span>}</div>}
      <button className={`btn ${sent ? "btn-soft" : "btn-primary"} profile-action`} onClick={() => setSent(!sent)}>{sent ? <><Check size={15} /> Interest Sent</> : <><Heart size={15} /> Send Interest</>}</button>
    </div>
  </article>;
}

export function EmptyState({ icon: Icon = Heart, title, description, action }: { icon?: typeof Heart; title: string; description: string; action?: string }) {
  return <div style={{ textAlign:"center", padding:"72px 20px", border:"1px dashed #dfe1eb", borderRadius:18, background:"#fff" }}><span style={{ width:52, height:52, display:"grid", placeItems:"center", margin:"0 auto 16px", color:"var(--plum)", background:"var(--lavender)", borderRadius:"50%" }}><Icon size={22} /></span><h3 style={{ margin:"0 0 8px", fontSize:18 }}>{title}</h3><p className="muted" style={{ margin:"0 auto 20px", maxWidth:350, fontSize:13, lineHeight:1.6 }}>{description}</p>{action && <button className="btn btn-primary">{action}</button>}</div>;
}

export function PageLoader() { return <div style={{ minHeight:"100vh", display:"grid", placeItems:"center", color:"var(--plum)" }} aria-label="Loading"><Heart size={28} fill="currentColor" /></div>; }
