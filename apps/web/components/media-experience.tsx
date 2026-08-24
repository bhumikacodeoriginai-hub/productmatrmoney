"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { ArrowRight, Check, Heart, LockKeyhole, MessageCircle, Pause, Play, RotateCcw, ShieldCheck, Star, Video, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";
import { engagementMoments, Profile, ProfileMedia } from "@/lib/mock-data";
import { PRODUCT_VIDEO_DURATION, PRODUCT_VIDEO_POSTER, PRODUCT_VIDEO_SRC } from "@/lib/media";
import { MediaPreview, Toast, VerifiedBadge } from "./ui";

export function ProductVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) { void video.play().then(() => setPlaying(true)).catch(() => setPlaying(false)); }
    else { video.pause(); setPlaying(false); }
  };
  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !muted;
    video.muted = nextMuted;
    setMuted(nextMuted);
    if (video.paused) { void video.play().then(() => setPlaying(true)).catch(() => setPlaying(false)); }
  };
  return <section className="section product-video-section" aria-labelledby="product-video-title"><div className="container"><div className="product-video-card"><div className="product-video-copy"><span className="eyebrow">See Advaita in motion</span><h2 id="product-video-title">A more human way to begin.</h2><p>Discover a calmer matrimony experience built around trust, privacy and conversations that feel real.</p><div className="product-video-actions"><button className="btn btn-primary" onClick={toggleSound} aria-label={muted ? "Turn product video sound on" : "Mute product video"}>{muted ? <VolumeX size={16} /> : <Volume2 size={16} />} {muted ? "Turn sound on" : "Mute sound"}</button><span className="product-video-note"><Video size={14} /> Product introduction · {PRODUCT_VIDEO_DURATION}</span></div></div><div className="product-video-frame"><video ref={videoRef} className="product-video-element" src={PRODUCT_VIDEO_SRC} poster={PRODUCT_VIDEO_POSTER} muted={muted} loop playsInline autoPlay preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} aria-label="Advaita Matrimony product introduction" /><div className="product-video-shade" /><div className="product-video-topline"><span className="pill pill-quiet"><ShieldCheck size={12} /> Privacy-first by design</span><span className="product-video-duration">{PRODUCT_VIDEO_DURATION}</span></div><div className="product-video-controls"><button className="media-play" onClick={togglePlay} aria-label={playing ? "Pause product video" : "Play product video"}>{playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}</button><button className="product-video-sound" onClick={toggleSound} aria-label={muted ? "Turn product video sound on" : "Mute product video"}>{muted ? <VolumeX size={17} /> : <Volume2 size={17} />}</button></div></div></div></div></section>;
}

export function MediaMatchSection({ profiles }: { profiles: Profile[] }) {
  return <section className="section media-match-section"><div className="container"><div className="media-match-header"><div className="section-head"><span className="eyebrow">See the person behind the profile</span><h2>Small details make a better first impression.</h2><p>Move through a few thoughtful profiles, understand what makes each person distinct, and connect only when it feels right.</p></div><span className="pill pill-verified"><ShieldCheck size={13} /> Consent-led profiles</span></div><div className="media-match-grid"><MatchDeck profiles={profiles} /><div className="moment-stack"><div className="media-callout"><div className="media-callout-icon"><ShieldCheck size={19} /></div><div><strong>Profiles with intention</strong><p>Clear context helps you decide who feels aligned without turning the search into a noisy social feed.</p></div></div><div className="media-callout"><div className="media-callout-icon"><LockKeyhole size={19} /></div><div><strong>Private by default</strong><p>Photos and videos can be public, shared after connection, request-only or private.</p></div></div><div className="media-callout"><div className="media-callout-icon"><MessageCircle size={19} /></div><div><strong>Conversation starters</strong><p>Every profile can answer one gentle prompt to make the first message easier.</p></div></div></div></div></div></section>;
}

export function MatchDeck({ profiles }: { profiles: Profile[] }) {
  const [index, setIndex] = useState(0);
  const [message, setMessage] = useState("");
  const current = profiles[index % profiles.length];
  const featuredMedia = current.media.find((item) => item.kind === "video") || current.media[0];
  const next = (action: "pass" | "shortlist" | "interest") => { setMessage(action === "interest" ? `Interest sent to ${current.name}` : action === "shortlist" ? `${current.name} saved to your shortlist` : "We’ll show you a different profile"); setIndex((value) => (value + 1) % profiles.length); };
  const onDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => { if (Math.abs(info.offset.x) > 80) next(info.offset.x > 0 ? "interest" : "pass"); };
  return <div className="deck-wrap"><div className="deck-progress"><span>Today's thoughtful picks</span><span>{index + 1} / {profiles.length}</span></div><div className="media-deck" aria-live="polite"><AnimatePresence mode="wait"><motion.article key={current.id} className="deck-card" drag="x" dragConstraints={{ left:0, right:0 }} dragElastic={.8} onDragEnd={onDragEnd} initial={{ opacity:0, scale:.92, y:16 }} animate={{ opacity:1, scale:1, y:0 }} exit={{ opacity:0, x:-180, rotate:-12 }} transition={{ type:"spring", stiffness:280, damping:24 }}><MediaPreview media={[featuredMedia]} className="deck-media" autoPlay={featuredMedia.kind === "video"} /><div className="deck-card-content"><div className="deck-card-heading"><div><VerifiedBadge /><h3>{current.name}, {current.age}</h3><p>{current.city} · {current.profession}</p></div><span className="deck-score">{current.compatibility}%<small>fit</small></span></div><div className="deck-prompt"><span className="eyebrow">{current.prompt ? "A little more about them" : "Profile note"}</span><p>“{current.prompt || current.about}”</p></div><div className="deck-tags">{current.tags.slice(0,3).map(tag => <span className="tag" key={tag}>{tag}</span>)}</div></div></motion.article></AnimatePresence></div><div className="deck-actions"><button className="deck-action deck-action-pass" onClick={() => next("pass")} aria-label="Pass this profile"><RotateCcw size={18} /></button><button className="deck-action deck-action-save" onClick={() => next("shortlist")} aria-label="Shortlist this profile"><Star size={18} /></button><button className="deck-action deck-action-interest" onClick={() => next("interest")} aria-label="Send interest"><Heart size={19} fill="currentColor" /></button><Link className="deck-action deck-action-open" href={`/app/profile/${current.id}`} aria-label={`Open ${current.name}'s profile`}><ArrowRight size={18} /></Link></div>{message && <div className="deck-feedback" role="status"><Check size={14} /> {message}</div>}</div>;
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


export function DashboardVideoSpotlight({ profile }: { profile: Profile }) {
  const [saved, setSaved] = useState(false);
  const video = profile.media.find((item) => item.kind === "video");
  if (!video) return null;
  return <motion.section className="dashboard-video-spotlight row g-0 overflow-hidden rounded-4 shadow-sm" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }}>
    <div className="col-lg-7 dashboard-video-frame"><MediaPreview media={[video]} className="dashboard-video-media" autoPlay /></div>
    <div className="col-lg-5 dashboard-video-copy p-4 p-xl-5 d-flex flex-column justify-content-center">
      <span className="eyebrow">Featured introduction</span>
      <h2>Meet {profile.name} beyond the basics.</h2>
      <p>Some connections begin with a small moment. Watch a short introduction, then decide if you want to know more.</p>
      <div className="d-flex flex-wrap gap-2 align-items-center mt-2"><span className="pill pill-verified"><ShieldCheck size={13} /> {profile.compatibility}% preference match</span><span className="pill pill-quiet"><Video size={12} /> {video.duration} intro</span></div>
      <div className="d-flex flex-wrap gap-2 mt-4"><Link href={`/app/profile/${profile.id}`} className="btn btn-primary">Open profile <ArrowRight size={15} /></Link><button className="btn btn-ghost" onClick={() => setSaved(!saved)}><Star size={15} /> {saved ? "Saved" : "Save for later"}</button></div>
      <small className="dashboard-video-note mt-3"><LockKeyhole size={13} /> Shared with consent · private media stays protected</small>
    </div>
  </motion.section>;
}
