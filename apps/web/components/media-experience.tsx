"use client";

import { useState } from "react";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { ArrowRight, Check, Heart, LockKeyhole, MessageCircle, RotateCcw, ShieldCheck, Star, Video } from "lucide-react";
import Link from "next/link";
import { engagementMoments, Profile, ProfileMedia } from "@/lib/mock-data";
import { MediaPreview, Toast, VerifiedBadge } from "./ui";

export function MediaMatchSection({ profiles }: { profiles: Profile[] }) {
  return <section className="section media-match-section"><div className="container"><div className="media-match-header"><div className="section-head"><span className="eyebrow">See the person behind the profile</span><h2>Small moments make a better first impression.</h2><p>Move through a few thoughtful profiles, watch a short introduction when it is shared with you, and connect only when it feels right.</p></div><span className="pill pill-verified"><ShieldCheck size={13} /> Consent-led media</span></div><div className="media-match-grid"><MatchDeck profiles={profiles} /><div className="moment-stack"><div className="media-callout"><div className="media-callout-icon"><Video size={19} /></div><div><strong>Profile introductions</strong><p>Short videos add context without turning the search into a noisy social feed.</p></div></div><div className="media-callout"><div className="media-callout-icon"><LockKeyhole size={19} /></div><div><strong>Private by default</strong><p>Photos and videos can be public, shared after connection, request-only or private.</p></div></div><div className="media-callout"><div className="media-callout-icon"><MessageCircle size={19} /></div><div><strong>Conversation starters</strong><p>Every profile can answer one gentle prompt to make the first message easier.</p></div></div></div></div></div></section>;
}

export function MatchDeck({ profiles }: { profiles: Profile[] }) {
  const [index, setIndex] = useState(0);
  const [message, setMessage] = useState("");
  const current = profiles[index % profiles.length];
  const next = (action: "pass" | "shortlist" | "interest") => { setMessage(action === "interest" ? `Interest sent to ${current.name}` : action === "shortlist" ? `${current.name} saved to your shortlist` : "We’ll show you a different profile"); setIndex((value) => (value + 1) % profiles.length); };
  const onDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => { if (Math.abs(info.offset.x) > 80) next(info.offset.x > 0 ? "interest" : "pass"); };
  return <div className="deck-wrap"><div className="deck-progress"><span>Today's thoughtful picks</span><span>{index + 1} / {profiles.length}</span></div><div className="media-deck" aria-live="polite"><AnimatePresence mode="wait"><motion.article key={current.id} className="deck-card" drag="x" dragConstraints={{ left:0, right:0 }} dragElastic={.8} onDragEnd={onDragEnd} initial={{ opacity:0, scale:.92, y:16 }} animate={{ opacity:1, scale:1, y:0 }} exit={{ opacity:0, x:-180, rotate:-12 }} transition={{ type:"spring", stiffness:280, damping:24 }}><MediaPreview media={current.media} className="deck-media" /><div className="deck-card-content"><div className="deck-card-heading"><div><VerifiedBadge /><h3>{current.name}, {current.age}</h3><p>{current.city} · {current.profession}</p></div><span className="deck-score">{current.compatibility}%<small>fit</small></span></div><div className="deck-prompt"><span className="eyebrow">{current.prompt ? "A little more about them" : "Profile note"}</span><p>“{current.prompt || current.about}”</p></div><div className="deck-tags">{current.tags.slice(0,3).map(tag => <span className="tag" key={tag}>{tag}</span>)}</div></div></motion.article></AnimatePresence></div><div className="deck-actions"><button className="deck-action deck-action-pass" onClick={() => next("pass")} aria-label="Pass this profile"><RotateCcw size={18} /></button><button className="deck-action deck-action-save" onClick={() => next("shortlist")} aria-label="Shortlist this profile"><Star size={18} /></button><button className="deck-action deck-action-interest" onClick={() => next("interest")} aria-label="Send interest"><Heart size={19} fill="currentColor" /></button><Link className="deck-action deck-action-open" href={`/app/profile/${current.id}`} aria-label={`Open ${current.name}'s profile`}><ArrowRight size={18} /></Link></div>{message && <div className="deck-feedback" role="status"><Check size={14} /> {message}</div>}</div>;
}

export function EngagementLoop() {
  const [active, setActive] = useState(0);
  const moment = engagementMoments[active];
  return <section className="section engagement-section"><div className="container"><div className="section-head"><span className="eyebrow">A reason to come back</span><h2>Retention without pressure.</h2><p>The strongest product loop is not endless scrolling. It is a useful next step, a clear privacy choice and one better conversation.</p></div><div className="engagement-grid"><div className="engagement-tabs">{engagementMoments.map((item, itemIndex) => <button className={`engagement-tab ${active === itemIndex ? "active" : ""}`} key={item.id} onClick={() => setActive(itemIndex)}><span>0{itemIndex + 1}</span><div><strong>{item.eyebrow}</strong><small>{item.title}</small></div><ArrowRight size={16} /></button>)}</div><motion.div className="engagement-card" key={moment.id} initial={{ opacity:0, x:15 }} animate={{ opacity:1, x:0 }} transition={{ duration:.25 }}><div className="engagement-orbit"><Heart size={28} fill="currentColor" /></div><span className="eyebrow">{moment.eyebrow}</span><h3>{moment.title}</h3><p>{moment.description}</p><button className="btn btn-primary" onClick={() => setActive((value) => (value + 1) % engagementMoments.length)}>{moment.action} <ArrowRight size={15} /></button><div className="engagement-trust"><ShieldCheck size={14} /> No noisy streaks. No manipulative countdowns.</div></motion.div></div></div></section>;
}

export function MediaGallery({ media }: { media: ProfileMedia[] }) {
  const [selected, setSelected] = useState(0);
  const item = media[selected];
  return <div className="media-gallery"><MediaPreview media={[item]} className="gallery-main" /><div className="gallery-thumbs">{media.map((entry, index) => <button className={`gallery-thumb ${selected === index ? "active" : ""}`} key={entry.id} onClick={() => setSelected(index)} aria-label={`View ${entry.kind} ${index + 1}`}><img src={entry.poster || entry.src} alt="" />{entry.kind === "video" && <Video size={13} />}</button>)}</div></div>;
}
