import { Tabs } from "expo-router";
import { Compass, Heart, Home, MessageCircle, UserRound } from "lucide-react-native";
import { StatusBar } from "expo-status-bar";
import { useLanguage } from "../../lib/language";
import { theme } from "../../lib/theme";

export default function TabsLayout(){
  const { t } = useLanguage();
  return <><StatusBar style="dark" backgroundColor={theme.background}/><Tabs screenOptions={{headerShown:false,tabBarActiveTintColor:theme.red,tabBarInactiveTintColor:theme.muted,tabBarStyle:{height:84,paddingTop:8,borderTopColor:theme.border,backgroundColor:theme.white},tabBarLabelStyle:{fontSize:10,fontWeight:"600"}}}><Tabs.Screen name="index" options={{title:t("home"),tabBarIcon:({color})=><Home size={20} color={color}/>}}/><Tabs.Screen name="discover" options={{title:t("discover"),tabBarIcon:({color})=><Compass size={20} color={color}/>}}/><Tabs.Screen name="matches" options={{title:t("matches"),tabBarIcon:({color})=><Heart size={20} color={color}/>}}/><Tabs.Screen name="messages" options={{title:t("messages"),tabBarIcon:({color})=><MessageCircle size={20} color={color}/>}}/><Tabs.Screen name="profile" options={{title:t("profile"),tabBarIcon:({color})=><UserRound size={20} color={color}/>}}/></Tabs></>;
}
