import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Pause, Play, ShieldCheck, Star, Video } from "lucide-react-native";
import { useVideoPlayer, VideoView } from "expo-video";

type Media = { kind: "image" | "video"; src: string; poster?: string; duration?: string };

export function MediaCover({ media, style }: { media: Media; style?: object }) {
  if (media.kind === "image") return <View style={[s.cover, style]}><Image source={{ uri: media.src }} style={StyleSheet.absoluteFill} resizeMode="cover" /></View>;
  return <NativeVideoCover media={media} style={style} />;
}

function NativeVideoCover({ media, style }: { media: Media; style?: object }) {
  const [playing, setPlaying] = useState(true);
  const player = useVideoPlayer(media.src, current => { current.loop = true; current.muted = true; current.play(); });
  useEffect(() => () => { player.pause(); }, [player]);
  const toggle = () => { if (playing) player.pause(); else player.play(); setPlaying(!playing); };
  return <Pressable style={[s.cover, style]} onPress={toggle} accessibilityRole="button" accessibilityLabel={playing ? "Pause profile intro" : "Play profile intro"}><VideoView player={player} style={StyleSheet.absoluteFill} contentFit="cover" nativeControls={false} /><View style={s.videoShade} /><View style={s.videoMeta}><View style={s.videoPill}><Video size={12} color="#fff" /><Text style={s.videoPillText}>Intro video</Text></View>{media.duration&&<Text style={s.duration}>{media.duration}</Text>}</View><View style={s.play}>{playing ? <Pause size={18} fill="#fff" color="#fff"/> : <Play size={18} fill="#fff" color="#fff"/>}</View></Pressable>;
}

export function MediaBadge({ hasVideo }: { hasVideo: boolean }) { return <View style={s.badge}><ShieldCheck size={13} color="#168B82" />{hasVideo&&<Video size={13} color="#6D46E8" />}</View>; }

export function NativeProfileCard({ name, meta, score, media, onPress }: { name: string; meta: string; score: string; media: Media[]; onPress: () => void }) { return <Pressable style={s.card} onPress={onPress} accessibilityRole="button" accessibilityLabel={`Open ${name} profile`}><MediaCover media={media[0]} style={s.cardPhoto}/><MediaBadge hasVideo={media.some(item=>item.kind === "video")} /><View style={s.cardBody}><View style={s.cardHeading}><Text style={s.name}>{name}</Text><Text style={s.score}>{score}</Text></View><Text style={s.meta}>{meta}</Text><View style={s.tags}><Text style={s.tag}>Verified</Text>{media.some(item=>item.kind === "video")&&<Text style={s.tag}>Video intro</Text>}<Star size={14} color="#C18B35" /></View></View></Pressable>; }

const s=StyleSheet.create({cover:{overflow:"hidden",backgroundColor:"#EAE8F2"},videoShade:{...StyleSheet.absoluteFillObject,backgroundColor:"rgba(24,35,61,.2)"},videoMeta:{position:"absolute",left:12,right:12,top:12,flexDirection:"row",justifyContent:"space-between",alignItems:"center"},videoPill:{flexDirection:"row",alignItems:"center",gap:5,paddingVertical:6,paddingHorizontal:8,borderRadius:8,backgroundColor:"rgba(24,35,61,.55)"},videoPillText:{fontSize:9,fontWeight:"700",color:"#fff"},duration:{fontSize:10,fontWeight:"700",color:"#fff"},play:{position:"absolute",left:"50%",top:"50%",width:46,height:46,marginLeft:-23,marginTop:-23,borderRadius:23,alignItems:"center",justifyContent:"center",backgroundColor:"rgba(24,35,61,.48)",borderWidth:1,borderColor:"rgba(255,255,255,.65)"},playIcon:{alignItems:"center",justifyContent:"center"},badge:{position:"absolute",left:12,top:12,flexDirection:"row",gap:5,alignItems:"center",padding:7,borderRadius:9,backgroundColor:"#E7F7F2"},card:{width:216,overflow:"hidden",borderWidth:1,borderColor:"#E7E8F0",borderRadius:17,backgroundColor:"#fff"},cardPhoto:{width:"100%",height:194},cardBody:{padding:13},cardHeading:{flexDirection:"row",justifyContent:"space-between",gap:8},name:{fontSize:13,fontWeight:"700",color:"#18233D"},score:{fontSize:12,fontWeight:"700",color:"#168B82"},meta:{fontSize:10,color:"#687188",marginTop:5,lineHeight:15},tags:{flexDirection:"row",alignItems:"center",gap:5,marginTop:11},tag:{fontSize:9,color:"#687188",backgroundColor:"#F1F1F6",paddingVertical:5,paddingHorizontal:7,borderRadius:6}});
