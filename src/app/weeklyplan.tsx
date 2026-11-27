
// Change based on new workoutPlan.ts

import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

import {
  generateWorkoutPlan,
  UserProfile,
  WorkoutDay,
} from "../utils/workoutPlan";

import type { WorkoutExercise } from "../utils/workoutDifficulty";

import { router } from 'expo-router';
import { chakras } from "../data/chakras";
import { globalStyles } from '../styles/global';
import { theme } from "../styles/theme";
import { selectExercises } from "../utils/exerciseSelector";
import { assignWorkoutDifficulty } from "../utils/workoutDifficulty";

export default function Plan() {
  const db = useSQLiteContext();

  const [plan, setPlan] = useState<DetailedWorkoutDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // stores which workout day is currently expanded, for expanding the specific exercises/splits for that day
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  
  // random dummy test profile:
//   const testProfile: UserProfile = {
//     experience: "Beginner",
//     weight_comfort: "Not comfortable",
//     exercise_frequency: "Rarely",
//     commitment: "3 days",
//     fitness_goal: "Build muscle",
//   };

//   useEffect(() => {
//     //console.log(selectExercises("Full Body A", testProfile));
//     const selected = selectExercises("Full Body A", testProfile);
//     const workout = assignWorkoutDifficulty(selected, testProfile)
//     console.log(workout)
//   }, []);

//Out: [{"difficulty": "beginner", "equipment": "none", "id": "chair_squat", "movement": "squat", "name": "Chair Squat"}, 
// {"difficulty": "beginner", "equipment": "none", "id": "incline_pushup", "movement": "push", "name": "Incline Push-Up"}, 
// {"difficulty": "beginner", "equipment": "none", "id": "glute_bridge", "movement": "hinge", "name": "Glute Bridge"}, 
// {"difficulty": "beginner", "equipment": "none", "id": "dead_bug", "movement": "core", "name": "Dead Bug"}]
  useEffect(() => {
    async function loadWorkoutPlan() {
      try {
        // Retrieve the latest onboarding profile
        const profile = await db.getFirstAsync<UserProfile>(
          `SELECT experience, weight_comfort,
                  exercise_frequency, commitment, fitness_goal
           FROM user_profile
           ORDER BY id DESC
           LIMIT 1`
        );

        if (!profile) {
          setError("No onboarding profile found.");
          return;
        }

        // // Generate plan using the saved profile
        // const weeklyPlan = generateWorkoutPlan(profile);

        // setPlan(weeklyPlan);


        // Generate plan using the saved profile
        const weeklyPlan = generateWorkoutPlan(profile);

        // console.log("Default export:", difficultyModule.default);
        // console.log("Default type:", typeof difficultyModule.default);

        //assignWorkoutDifficulty: undefined error
        // console.log("generateWorkoutPlan:", typeof generateWorkoutPlan);
        // console.log("selectExercises:", typeof selectExercises);
        // console.log("assignWorkoutDifficulty:", typeof assignWorkoutDifficulty);

        // Add specific exercises to each day
        const detailedPlan: DetailedWorkoutDay[] = weeklyPlan.map((day) => {

        // Rest days don't need exercises
        if (day.isRest) {
            return {
            ...day,
            exercises: [],
            };
        }

        // Choose exercises based on the workout and user profile
        const selected = selectExercises(day.workout, profile);

        // Assign sets, reps, and rest times
        const workoutExercises = assignWorkoutDifficulty(selected, profile);

        // Combine the original day with its exercises
        return {
            ...day,
            exercises: workoutExercises,
        };
        });

        setPlan(detailedPlan);

      } catch (err) {
        console.error(err);
        setError("Could not load your workout plan.");
      } finally {
        setLoading(false);
      }
    }

    loadWorkoutPlan();
  }, [db]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#C9AC68" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>Your Weekly Plan</Text>

      <Text style={styles.subtitle}>
        Click each day to see your curated schedule.
      </Text>


    {plan.map((item) => (
    <Pressable
        key={item.day}
        onPress={() => {
        // If this day is already open, close it
        // Otherwise, expand the selected day
        setExpandedDay(
            expandedDay === item.day ? null : item.day
        );
        }}
        style={[
        styles.dayCard,
        item.isRest && styles.restCard,
        ]}
    >

        <View style={styles.chakraRow}>

          {/* Display the corresponding chakra image */}
          <Image
            source={chakras[item.day].image}
            style={styles.chakraImage}
            resizeMode="contain"
          />

          {/* Display the workout information */}
          <View style={styles.chakraInfo}>

            <Text style={styles.day}>
              {item.day.toUpperCase()}
            </Text>

            {/* <Text
              style={[
                styles.chakraName,
                { color: chakras[item.day].color },
              ]}
            >
              {chakras[item.day].name} Chakra
            </Text> */}

            <Text style={styles.workout}>
              {item.workout}
            </Text>

            <Text style={styles.description}>
              {item.description}
            </Text>

          </View>
        </View>


        {/* Display exercises only when this day is expanded */}
        {expandedDay === item.day && !item.isRest && (
        <View style={styles.exerciseList}>
            {item.exercises.map((exercise) => (
            <View
                key={exercise.id}
                style={styles.exerciseItem}
            >
                <Text style={styles.exerciseName}>
                {exercise.name}
                </Text>

                <Text style={styles.exerciseDetails}>
                {exercise.durationMinutes !== undefined
                    ? `${exercise.durationMinutes} minutes`
                    : `${exercise.sets} sets × ${exercise.reps} reps`}
                </Text>

                {exercise.restSeconds !== undefined && (
                <Text style={styles.exerciseRest}>
                    Rest: {exercise.restSeconds} seconds
                </Text>
                )}
            </View>
            ))}
        </View>
        )}
    </Pressable>
    ))}

      {/* Temporary button to access the story screen */}
      <Pressable
        style={({ pressed }) => [
          globalStyles.rpgButton,
          {
            opacity: pressed ? 0.7 : 1,
            transform: [{ scale: pressed ? 0.96 : 1 }],
            marginTop: 20,
          },
        ]}
        onPress={() => router.push("/story")}
      >
        <Text style={globalStyles.rpgButtonText}>
          BEGIN STORY →
        </Text>
      </Pressable>
    </ScrollView>
  );
}

// because & combines this is just a culmination of all
// contains the original day, workout, description, and rest status, plus an array of exercises.
type DetailedWorkoutDay = WorkoutDay & {
  exercises: WorkoutExercise[];
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  content: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontFamily: "MedievalSharp_400Regular",
    fontSize: 32,
    color: theme.parchment,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "CormorantGaramond_400Regular_Italic",
    fontSize: 21,
    color: theme.gold,
    marginBottom: 28,
  },
  dayCard: {
    backgroundColor: theme.stone,
    padding: 18,
    borderRadius: 0,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.border,
  },
  restCard: {
    backgroundColor: "#242824",
    borderColor: "#353D35",
  },
  day: {
    fontFamily: "MedievalSharp_400Regular",
    fontSize: 18,
    color: theme.gold,
    marginBottom: 6,
  },
  workout: {
    fontFamily: "Inter_700Bold",
    fontSize: 19,
    color: theme.parchment,
    marginBottom: 4,
  },
  description: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "#C9C6B8",
  },

  exerciseList: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.goldDark,
  },

  exerciseItem: {
    marginBottom: 14,
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: theme.goldDark,
  },

  exerciseName: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: theme.parchment,
    marginBottom: 4,
  },

  exerciseDetails: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: theme.gold,
  },

  exerciseRest: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#B8B8AC",
    marginTop: 3,
  },

  //only for chakra
  chakraRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  // Chakra image displayed beside each workout
  chakraImage: {
    width: 58,
    height: 58,
  },

  // Allows the workout information to use remaining space
  chakraInfo: {
    flex: 1,
  },

  // Displays the corresponding chakra name
  chakraName: {
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 1,
    marginBottom: 5,
  },
});

