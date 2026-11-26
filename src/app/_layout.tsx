import { initializeDatabase } from '@/database/db';
import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';

//Need new text, root: layout so should put in here
// Good text candidates: Medieval Sharp for titles, Coramorant?? for general text and then Inter for everything else
// https://docs.expo.dev/develop/user-interface/fonts/
// import { useFonts } from 'expo-font'

// import { MedievalSharp_400Regular } from "@expo-google-fonts/medievalsharp";
// import {
//   CormorantGaramond_400Regular,
//   CormorantGaramond_400Regular_Italic,
//   CormorantGaramond_600SemiBold,
// } from "@expo-google-fonts/cormorant-garamond";

// import {
//   Inter_400Regular,
//   Inter_600SemiBold,
//   Inter_700Bold,
// } from "@expo-google-fonts/inter";


export default function RootLayout() {
  return (
    <SQLiteProvider
        databaseName="fitness-rpg.db"
        onInit={initializeDatabase}
    >
        <Stack screenOptions={{ headerShown: false }} />
    </SQLiteProvider>
  );
}