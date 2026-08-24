import { AppShell } from "@/components/app-shell";
import { ProfileCard } from "@/components/ui";
import { profiles } from "@/lib/mock-data";
export default function Matches(){return <AppShell active="Matches"><div className="content-heading"><div><h2>Your preference matches</h2><p className="muted" style={{fontSize:12,marginTop:5}}>Profiles aligned with what you told us matters.</p></div><span className="pill pill-verified">14 new today</span></div><div className="profile-grid">{profiles.map(p=><ProfileCard key={p.id} profile={p}/>)}</div></AppShell>}
