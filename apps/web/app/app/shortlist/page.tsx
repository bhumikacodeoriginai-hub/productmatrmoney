import { Star } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ProfileCard } from "@/components/ui";
import { profiles } from "@/lib/mock-data";
export default function Shortlist(){return <AppShell active="Shortlisted"><div className="content-heading"><div><h2>Saved profiles</h2><p className="muted" style={{fontSize:12,marginTop:5}}>Profiles you save will appear here.</p></div><button className="btn btn-ghost" style={{minHeight:38,fontSize:11}}><Star size={14}/> Sort by recent</button></div><div className="profile-grid">{profiles.slice(1,4).map(p=><ProfileCard key={p.id} profile={p}/>)}</div></AppShell>}
