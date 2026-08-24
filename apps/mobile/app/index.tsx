import { useEffect, useRef, useState } from "react";
import { Animated, Easing, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Heart, ShieldCheck } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLanguage } from "../lib/language";

export default function Splash() {
  const { t } = useLanguage();
  const [ready, setReady] = useState(false);
  const bond = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;
  const reveal = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const bonding = Animated.parallel([
      Animated.timing(bond, { toValue: 1, duration: 1150, delay: 140, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.sequence([
        Animated.delay(850),
        Animated.timing(pulse, { toValue: 1, duration: 520, easing: Easing.out(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 520, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ]),
    ]);
    bonding.start();
    Animated.timing(reveal, { toValue: 1, duration: 450, delay: 1750, useNativeDriver: true }).start(() => setReady(true));
    return () => bonding.stop();
  }, [bond, pulse, reveal]);

  const leftHeartStyle = {
    opacity: bond.interpolate({ inputRange: [0, 1], outputRange: [0.45, 1] }),
    transform: [
      { translateX: bond.interpolate({ inputRange: [0, 1], outputRange: [-28, 29] }) },
      { rotate: bond.interpolate({ inputRange: [0, 1], outputRange: ["-18deg", "-7deg"] }) },
      { scale: bond.interpolate({ inputRange: [0, 1], outputRange: [0.82, 1] }) },
    ],
  };
  const rightHeartStyle = {
    opacity: bond.interpolate({ inputRange: [0, 1], outputRange: [0.45, 1] }),
    transform: [
      { translateX: bond.interpolate({ inputRange: [0, 1], outputRange: [28, -29] }) },
      { rotate: bond.interpolate({ inputRange: [0, 1], outputRange: ["18deg", "7deg"] }) },
      { scale: bond.interpolate({ inputRange: [0, 1], outputRange: [0.82, 1] }) },
    ],
  };
  const ringStyle = {
    transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.55] }) }],
    opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.4, 0] }),
  };

  return <LinearGradient colors={["#18233D", "#3C286E", "#7D3F70"]} style={styles.screen}>
    <View style={styles.center}>
      <View style={styles.bondStage}>
        <Animated.View style={[styles.ringGlow, ringStyle]} />
        <Animated.View style={[styles.heart, styles.heartLeft, leftHeartStyle]}><Heart size={34} color="#fff" fill="#fff" /></Animated.View>
        <Animated.View style={[styles.heart, styles.heartRight, rightHeartStyle]}><Heart size={34} color="#F3D9FF" fill="#F3D9FF" /></Animated.View>
      </View>
      <Text style={styles.brand}>Advaita Matrimony</Text>
      <Text style={styles.tagline}>{t("tagline")}</Text>
      <Text style={styles.kannada}>{t("kannadaTagline")}</Text>
    </View>
    <Animated.View style={{ opacity: reveal }}>{ready && <Pressable style={styles.button} onPress={() => router.replace("/(tabs)")} accessibilityRole="button" accessibilityLabel={t("beginJourney")}><Text style={styles.buttonText}>{t("beginJourney")}</Text></Pressable>}</Animated.View>
    <View style={styles.footer}><ShieldCheck size={15} color="#91E5D5" /><Text style={styles.footText}>{t("privacyInclusive")}</Text></View>
  </LinearGradient>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, justifyContent: "space-between" },
  center: { alignItems: "center", marginTop: 170 },
  bondStage: { width: 150, height: 105, alignItems: "center", justifyContent: "center", marginBottom: 18 },
  heart: { position: "absolute", top: 30, width: 58, height: 58, alignItems: "center", justifyContent: "center" },
  heartLeft: { left: 12 },
  heartRight: { right: 12 },
  ringGlow: { position: "absolute", top: 8, width: 105, height: 105, borderRadius: 53, borderWidth: 1, borderColor: "rgba(216,202,255,.75)" },
  brand: { fontSize: 22, fontWeight: "700", color: "#fff", letterSpacing: -0.5 },
  tagline: { fontSize: 13, color: "#F3D9FF", marginTop: 10, fontWeight: "600" },
  kannada: { fontSize: 12, color: "#D8D7E8", marginTop: 6 },
  button: { height: 52, borderRadius: 15, alignItems: "center", justifyContent: "center", backgroundColor: "#fff", marginBottom: 16 },
  buttonText: { fontSize: 14, fontWeight: "700", color: "#3D2872" },
  footer: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 7, marginBottom: 10 },
  footText: { fontSize: 11, color: "#D8D7E8" },
});
