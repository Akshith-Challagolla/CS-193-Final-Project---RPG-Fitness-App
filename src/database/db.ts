// Create a table

import { SQLiteDatabase } from 'expo-sqlite';

export async function initializeDatabase(db: SQLiteDatabase) {

    await db.execAsync(
        //The async keyword allows the function to perform asynchronous operations. 
        //await means the code waits for the database operation to complete before continuing.

        //Store each of the five question answers as text.
        /* CREATE TABLE SQL */
        `
        CREATE TABLE IF NOT EXISTS user_profile (
            id INTEGER PRIMARY KEY NOT NULL,
            experience TEXT,
            weight_comfort TEXT,
            exercise_frequency TEXT,
            commitment TEXT,
            fitness_goal TEXT
        );
    `);
}
