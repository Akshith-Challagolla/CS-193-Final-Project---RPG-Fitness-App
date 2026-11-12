import { initializeDatabase } from '@/database/db';
import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';

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