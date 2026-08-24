import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LanguageProvider } from "../lib/language";
import { theme } from "../lib/theme";
export default function Layout(){return <LanguageProvider><SafeAreaProvider><StatusBar style="auto" backgroundColor={theme.background}/><Stack screenOptions={{headerShown:false,animation:"fade"}}/></SafeAreaProvider></LanguageProvider>}
