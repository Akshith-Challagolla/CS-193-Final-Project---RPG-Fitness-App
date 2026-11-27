import { initializeDatabase } from '@/database/db';
import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';

//Need new text, root: layout so should put in here
// Good text candidates: Medieval Sharp for titles, Coramorant?? for general text and then Inter for everything else
// https://docs.expo.dev/develop/user-interface/fonts/
import { useFonts } from 'expo-font';

import {
  CormorantGaramond_400Regular,
  CormorantGaramond_400Regular_Italic,
  CormorantGaramond_600SemiBold,
} from "@expo-google-fonts/cormorant-garamond";
import { MedievalSharp_400Regular } from "@expo-google-fonts/medievalsharp";

import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";


export default function RootLayout() {
  //importing new text
  const [fontsLoaded, fontError] = useFonts({
    MedievalSharp_400Regular,
    CormorantGaramond_400Regular,
    CormorantGaramond_400Regular_Italic,
    CormorantGaramond_600SemiBold,
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  // no screen rendering until we have the fonts just so we don't get wonky transition
  if (!fontsLoaded && !fontError) {
    return null;
  }

  // If loading fails then I want to see some error in the console alerting me that it's not loading, just as an extra step
  if (fontError) {
    console.error("Font loading failed:", fontError);
  }
  return (
    <SQLiteProvider
        databaseName="fitness-rpg.db"
        onInit={initializeDatabase}
    >
        <Stack screenOptions={{ headerShown: false }} />
    </SQLiteProvider>
  );
}