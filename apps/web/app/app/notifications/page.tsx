"use client";
import { useState } from "react";
import { Bell, Eye, Heart, LockKeyhole, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { notifications } from "@/lib/mock-data";
const icons={interest:Heart,view:Eye,photo:LockKeyhole,system:ShieldCheck};
export default function Notifications(){const[items,setItems]=useState(notifications);return <AppShell active="Home"><div className="content-heading"><h2>Notifications</h2><button className="table-action" onClick={()=>setItems(items.map(n=>({...n,unread:false})))}>Mark all as read</button></div><div className="side-card">{items.map(n=>{const Icon=icons[n.type as keyof typeof icons];return <div key={n.id} className="activity-item" style={{padding:"17px 0"}}><span className="activity-icon"><Icon size={15}/></span><div style={{flex:1}}><strong>{n.title} {n.unread&&<span className="dot" style={{color:"var(--rose)",marginLeft:4}}/>}</strong><span>{n.description}</span></div><span className="muted" style={{fontSize:10}}>{n.time}</span></div>})}</div></AppShell>}
