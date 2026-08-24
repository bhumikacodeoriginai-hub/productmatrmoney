import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LanguageProvider } from "../lib/language";
export default function Layout(){return <LanguageProvider><SafeAreaProvider><StatusBar style="auto"/><Stack screenOptions={{headerShown:false,animation:"fade"}}/></SafeAreaProvider></LanguageProvider>}
