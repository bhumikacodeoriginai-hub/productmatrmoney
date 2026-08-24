import { useEffect, useRef, useState } from "react";
import { Animated, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Pause, Play, ShieldCheck, Star, Video, Volume2, VolumeX } from "lucide-react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import { useLanguage } from "../lib/language";
import { theme } from "../lib/theme";

type Media = { kind: "image" | "video"; src: string; poster?: string; duration?: string };

export function MediaCover({ media, style, autoPlay = true }: { media: Media; style?: object; autoPlay?: boolean }) {
  if (media.kind === "image") return <View style={[s.cover, style]}><Image source={{ uri: media.src }} style={StyleSheet.absoluteFill} resizeMode="cover" /></View>;
  return <NativeVideoCover media={media} style={style} autoPlay={autoPlay} />;
}

function NativeVideoCover({ media, style, autoPlay }: { media: Media; style?: object; autoPlay: boolean }) {
  const [playing, setPlaying] = useState(autoPlay);
  const { t } = useLanguage();
  const pulse = useRef(new Animated.Value(0)).current;
  const player = useVideoPlayer(media.src, current => { current.loop = true; current.muted = true; if (autoPlay) current.play(); });
  useEffect(() => () => { player.pause(); }, [player]);
  useEffect(() => {
    const animation = Animated.loop(Animated.sequence([
      Animated.timing(pulse, { toValue: 1, duration: 1700, useNativeDriver: true }),
      Animated.timing(pulse, { toValue: 0, duration: 1700, useNativeDriver: true }),
    ]));
    animation.start();
    return () => animation.stop();
  }, [pulse]);
  const toggle = () => { if (playing) player.pause(); else player.play(); setPlaying(!playing); };
  return <Pressable style={[s.cover, style]} onPress={toggle} accessibilityRole="button" accessibilityLabel={playing ? t("pauseProfile") : t("playProfile")}><VideoView player={player} style={StyleSheet.absoluteFill} contentFit="cover" nativeControls={false} /><View style={s.videoShade} /><Animated.View style={[s.playPulse, { opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.08, 0.28] }), transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.35] }) }] }]} /><View style={s.videoMeta}><View style={s.videoPill}><Video size={12} color={theme.white} /><Text style={s.videoPillText}>{t("introVideo")}</Text></View>{media.duration&&<Text style={s.duration}>{media.duration}</Text>}</View><View style={s.play}>{playing ? <Pause size={18} fill={theme.white} color={theme.white}/> : <Play size={18} fill={theme.white} color={theme.white}/>}</View></Pressable>;
}

export function ProductVideoCover({ src, poster, duration = "0:10", style }: { src: string; poster?: string; duration?: string; style?: object }) {
  const { t } = useLanguage();
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const pulse = useRef(new Animated.Value(0)).current;
  const player = useVideoPlayer(src, current => { current.loop = true; current.muted = true; current.play(); });
  useEffect(() => () => { player.pause(); }, [player]);
  useEffect(() => {
    const animation = Animated.loop(Animated.sequence([
      Animated.timing(pulse, { toValue: 1, duration: 1700, useNativeDriver: true }),
      Animated.timing(pulse, { toValue: 0, duration: 1700, useNativeDriver: true }),
    ]));
    animation.start();
    return () => animation.stop();
  }, [pulse]);
  const togglePlay = () => { if (playing) player.pause(); else player.play(); setPlaying(!playing); };
  const toggleSound = () => {
    const nextMuted = !muted;
    player.muted = nextMuted;
    setMuted(nextMuted);
    player.play();
    setPlaying(true);
  };
  return <View style={[s.productVideo, style]}><Image source={poster ? { uri: poster } : undefined} style={StyleSheet.absoluteFill} resizeMode="cover" /><VideoView player={player} style={StyleSheet.absoluteFill} contentFit="cover" nativeControls={false} /><View style={s.videoShade} /><View style={s.productTopline}><View style={s.videoPill}><ShieldCheck size={12} color={theme.white} /><Text style={s.videoPillText}>{t("productIntro")}</Text></View><Text style={s.duration}>{duration}</Text></View><Animated.View style={[s.productPulse, { opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.08, 0.28] }), transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.35] }) }] }]} /><Pressable style={s.productPlay} onPress={togglePlay} accessibilityRole="button" accessibilityLabel={playing ? t("pauseProduct") : t("playProduct")}>{playing ? <Pause size={18} fill={theme.white} color={theme.white} /> : <Play size={18} fill={theme.white} color={theme.white} />}</Pressable><Pressable style={s.productSound} onPress={toggleSound} accessibilityRole="button" accessibilityLabel={muted ? t("soundOn") : t("muteProduct")}>{muted ? <VolumeX size={17} color={theme.white} /> : <Volume2 size={17} color={theme.white} />}</Pressable></View>;
}

export function MediaBadge({ hasVideo }: { hasVideo: boolean }) { return <View style={s.badge}><ShieldCheck size={13} color={theme.teal} />{hasVideo&&<Video size={13} color={theme.red} />}</View>; }

export function NativeProfileCard({ name, meta, score, media, onPress }: { name: string; meta: string; score: string; media: Media[]; onPress: () => void }) { const { t } = useLanguage(); return <Pressable style={s.card} onPress={onPress} accessibilityRole="button" accessibilityLabel={`${t("openProfile")}: ${name}`}><MediaCover media={media[0]} style={s.cardPhoto} autoPlay={false}/><MediaBadge hasVideo={media.some(item=>item.kind === "video")} /><View style={s.cardBody}><View style={s.cardHeading}><Text style={s.name}>{name}</Text><Text style={s.score}>{score}</Text></View><Text style={s.meta}>{meta}</Text><View style={s.tags}><Text style={s.tag}>{t("verified")}</Text>{media.some(item=>item.kind === "video")&&<Text style={s.tag}>{t("introVideo")}</Text>}<Star size={14} color={theme.gold} /></View></View></Pressable>; }

const s=StyleSheet.create({productVideo:{position:"relative",overflow:"hidden",minHeight:230,borderRadius:18,backgroundColor:theme.redDeep},productTopline:{position:"absolute",left:12,right:12,top:12,flexDirection:"row",justifyContent:"space-between",alignItems:"center",gap:8},productPulse:{position:"absolute",left:"50%",top:"50%",width:58,height:58,marginLeft:-29,marginTop:-29,borderRadius:29,borderWidth:1,borderColor:theme.redPale,backgroundColor:"rgba(198,40,40,.3)"},productPlay:{position:"absolute",left:"50%",top:"50%",width:48,height:48,marginLeft:-24,marginTop:-24,borderRadius:24,alignItems:"center",justifyContent:"center",backgroundColor:"rgba(91,11,18,.5)",borderWidth:1,borderColor:"rgba(255,255,255,.7)"},productSound:{position:"absolute",right:12,bottom:12,width:42,height:42,borderRadius:21,alignItems:"center",justifyContent:"center",backgroundColor:"rgba(91,11,18,.55)",borderWidth:1,borderColor:"rgba(255,255,255,.65)"},cover:{overflow:"hidden",backgroundColor:theme.background},videoShade:{...StyleSheet.absoluteFillObject,backgroundColor:"rgba(91,11,18,.2)"},playPulse:{position:"absolute",left:"50%",top:"50%",width:58,height:58,marginLeft:-29,marginTop:-29,borderRadius:29,borderWidth:1,borderColor:theme.redPale,backgroundColor:"rgba(198,40,40,.3)"},videoMeta:{position:"absolute",left:12,right:12,top:12,flexDirection:"row",justifyContent:"space-between",alignItems:"center"},videoPill:{flexDirection:"row",alignItems:"center",gap:5,paddingVertical:6,paddingHorizontal:8,borderRadius:8,backgroundColor:"rgba(91,11,18,.55)"},videoPillText:{fontSize:9,fontWeight:"700",color:theme.white},duration:{fontSize:10,fontWeight:"700",color:theme.white},play:{position:"absolute",left:"50%",top:"50%",width:46,height:46,marginLeft:-23,marginTop:-23,borderRadius:23,alignItems:"center",justifyContent:"center",backgroundColor:"rgba(91,11,18,.48)",borderWidth:1,borderColor:"rgba(255,255,255,.65)"},playIcon:{alignItems:"center",justifyContent:"center"},badge:{position:"absolute",left:12,top:12,flexDirection:"row",gap:5,alignItems:"center",padding:7,borderRadius:9,backgroundColor:"#E7F7F2"},card:{width:216,overflow:"hidden",borderWidth:1,borderColor:theme.border,borderRadius:17,backgroundColor:theme.white},cardPhoto:{width:"100%",height:194},cardBody:{padding:13},cardHeading:{flexDirection:"row",justifyContent:"space-between",gap:8},name:{fontSize:13,fontWeight:"700",color:theme.redDeep},score:{fontSize:12,fontWeight:"700",color:theme.teal},meta:{fontSize:10,color:theme.muted,marginTop:5,lineHeight:15},tags:{flexDirection:"row",alignItems:"center",gap:5,marginTop:11},tag:{fontSize:9,color:theme.muted,backgroundColor:"#F1F1F6",paddingVertical:5,paddingHorizontal:7,borderRadius:6}});
