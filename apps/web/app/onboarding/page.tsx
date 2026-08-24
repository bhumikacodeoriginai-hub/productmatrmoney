"use client";

import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { ArrowLeft, ArrowRight, Check, HelpCircle, LockKeyhole, Upload, Video, X } from "lucide-react";
import { Brand } from "@/components/ui";

const steps = ["Account", "About you", "Location", "Education", "Career", "Family", "Lifestyle", "Inclusion", "Preferences", "Photos", "Preview"];
type UploadItem = { id: string; kind: "image" | "video"; src: string; name: string };

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const pct = Math.round(((step + 1) / steps.length) * 100);

  const handleUploads = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploads(files.map((file) => ({
      id: `${file.name}-${file.lastModified}`,
      kind: file.type.startsWith("video") ? "video" : "image",
      src: URL.createObjectURL(file),
      name: file.name,
    })));
  };

  if (complete) {
    return <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, background: "linear-gradient(140deg,#f7f4ff,#fff8f3)" }}>
      <div style={{ maxWidth: 470, textAlign: "center", padding: 40, background: "#fff", border: "1px solid var(--line)", borderRadius: 22, boxShadow: "var(--shadow)" }}>
        <span style={{ width: 60, height: 60, display: "grid", placeItems: "center", margin: "0 auto 20px", color: "#fff", background: "var(--teal)", borderRadius: "50%" }}><Check size={28} /></span>
        <span className="eyebrow">You’re on your way</span>
        <h1 className="display" style={{ fontSize: 38, margin: "10px 0" }}>Your profile is ready to shine.</h1>
        <p className="muted" style={{ fontSize: 13, lineHeight: 1.7 }}>We’ve saved your progress. Add a photo and verify your profile when you’re ready to start discovering meaningful matches.</p>
        <Link href="/app" className="btn btn-primary" style={{ marginTop: 15 }}>Go to my space <ArrowRight size={16} /></Link>
      </div>
    </div>;
  }

  return <div style={{ minHeight: "100vh", background: "#f8f7fb" }}>
    <header className="public-nav"><div className="container public-nav-inner"><Brand /><span className="muted" style={{ fontSize: 12 }}>Profile setup · Saved automatically</span><Link href="/" className="nav-link">Save & exit</Link></div></header>
    <main className="container" style={{ padding: "38px 0 80px" }}>
      <div className="onboarding-layout">
        <aside><div className="eyebrow">Your profile</div><h1 className="display" style={{ fontSize: 32, margin: "10px 0 25px" }}>A little more about you.</h1><div style={{ height: 7, background: "#e5e5ed", borderRadius: 8, overflow: "hidden", marginBottom: 8 }}><div style={{ width: `${pct}%`, height: "100%", background: "linear-gradient(90deg,var(--plum),var(--rose))", transition: "width .3s" }} /></div><strong style={{ fontSize: 12 }}>{pct}% complete</strong><ol style={{ listStyle: "none", padding: 0, marginTop: 32 }}>{steps.map((item, i) => <li key={item} style={{ display: "flex", alignItems: "center", gap: 10, margin: "13px 0", color: i === step ? "var(--plum)" : i < step ? "var(--teal)" : "var(--ink-soft)", fontSize: 12, fontWeight: i === step ? 700 : 500 }}><span style={{ width: 22, height: 22, display: "grid", placeItems: "center", borderRadius: "50%", background: i < step ? "#e3f6f1" : i === step ? "var(--lavender)" : "#eeeef3", fontSize: 10 }}>{i < step ? <Check size={12} /> : i + 1}</span>{item}</li>)}</ol></aside>
        <section className="side-card" style={{ padding: 32 }}><div style={{ display: "flex", justifyContent: "space-between", gap: 20, alignItems: "start" }}><div><span className="eyebrow">Step {step + 1} of {steps.length}</span><h2 style={{ fontSize: 26, margin: "10px 0 7px" }}>{steps[step]}</h2><p className="muted" style={{ fontSize: 12, margin: 0 }}>This helps us introduce you to people who are more likely to understand your journey.</p></div><HelpCircle size={18} color="#a0a6b5" /></div>
          <div style={{ marginTop: 30 }}>{renderStep(step, uploads, handleUploads, setUploads)}</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 36, paddingTop: 20, borderTop: "1px solid var(--line)" }}><button className="btn btn-ghost" disabled={step === 0} onClick={() => setStep(Math.max(0, step - 1))}><ArrowLeft size={15} /> Back</button>{step === steps.length - 1 ? <button className="btn btn-primary" onClick={() => setComplete(true)}>Preview profile <Check size={15} /></button> : <button className="btn btn-primary" onClick={() => setStep(step + 1)}>Continue <ArrowRight size={15} /></button>}</div>
        </section>
      </div>
    </main>
  </div>;
}

function renderStep(step: number, uploads: UploadItem[], handleUploads: (event: ChangeEvent<HTMLInputElement>) => void, setUploads: (items: UploadItem[]) => void) {
  if (step === 0) return <><Field label="I’m creating a profile for" placeholder="Myself" /><Field label="Email address" placeholder="you@example.com" /><Field label="Mobile number" placeholder="+91 98765 43210" /></>;
  if (step === 1) return <><Field label="Your name" placeholder="How should we introduce you?" /><Field label="Date of birth" placeholder="DD / MM / YYYY" /><Field label="A few words about you" placeholder="What brings you here?" textarea /></>;
  if (step === 2) return <><Field label="City you live in" placeholder="Search your city" /><Field label="Open to meeting someone from" placeholder="Any city in India" /></>;
  if (step === 7) return <><label className="form-field"><span>Profile category</span><select className="form-input"><option>General Public (Standard Matrimony)</option><option>Physically Challenged / Locomotor Impairment (Divyangjan)</option><option>Hearing & Speech Impaired (Deaf & Mute)</option><option>Vitiligo / Skin Condition Specific Profiles</option></select></label><Field label="Anything you’d like people to know?" placeholder="Optional — share only what feels right" textarea /><p className="muted" style={{ fontSize: 11, display: "flex", gap: 6, alignItems: "center" }}><LockKeyhole size={14} /> This is private information. You choose who can see it.</p></>;
  if (step === 9) return <><div className="upload-zone"><Upload size={27} color="var(--plum)" /><h3 style={{ fontSize: 16, margin: "12px 0 5px" }}>Add photos and a short introduction</h3><p className="muted" style={{ fontSize: 12, lineHeight: 1.6, maxWidth: 350, margin: "0 auto 16px" }}>Show the real you with up to 6 photos and one 30-second video. You decide who can view each item.</p><label className="btn btn-soft" htmlFor="media-upload"><Upload size={15} /> Choose photos or video</label><input id="media-upload" type="file" accept="image/*,video/*" multiple className="sr-only" onChange={handleUploads} /><div className="upload-privacy"><LockKeyhole size={14} /> Public by default? No — each item starts as request-only.</div></div>{uploads.length > 0 && <div className="upload-previews">{uploads.map((item) => <div className="upload-preview" key={item.id}><div className="upload-preview-media">{item.kind === "video" ? <><video src={item.src} muted playsInline preload="metadata" /><span><Video size={13} /></span></> : <img src={item.src} alt={item.name} />}</div><button type="button" className="upload-remove" onClick={() => setUploads(uploads.filter((entry) => entry.id !== item.id))} aria-label={`Remove ${item.name}`}><X size={13} /></button><small>{item.kind === "video" ? "Video intro" : "Profile photo"}</small></div>)}</div>}</>;
  return <><Field label={steps[step]} placeholder={`Tell us about your ${steps[step].toLowerCase()}`} /><Field label="What matters most to you?" placeholder="Choose an option" /></>;
}

function Field({ label, placeholder, textarea = false }: { label: string; placeholder: string; textarea?: boolean }) { return <label className="form-field"><span>{label}</span>{textarea ? <textarea className="form-input" style={{ paddingTop: 12, minHeight: 95, resize: "vertical" }} placeholder={placeholder} /> : <input className="form-input" placeholder={placeholder} />}</label>; }
