//Create a set/rep count to amp up difficulty based on the three levels: Beginner, intermediate, advanced
//Each exercise now should have some rep/set counts values

import type { Exercise } from "../data/exercises";
import type { UserProfile } from "./workoutPlan";

// Exercise add sets, reps, and rest information
// & combines the typescript types we want to combine them so use & originally
// ? - as before it makes that property optional, cardio doesn't need sets and reps nor does stretches as much, each
// type is different, we don't want to make anything permanent
export type WorkoutExercise = Exercise & {
  sets?: number;
  reps?: number;
  durationMinutes?: number;
  restSeconds?: number;
};


export function assignWorkoutDifficulty(
  selectedExercises: Exercise[],
  profile: UserProfile
): WorkoutExercise[] {

  // determine starting workload from experience
  const experience = profile.experience.toLowerCase();

  let sets = 2;
  let reps = 10;
  let restSeconds = 60;

  if (experience === "intermediate") {
    sets = 3;
    reps = 10;
    restSeconds = 90;
  } else if (experience === "advanced") {
    sets = 3;
    reps = 8;
    restSeconds = 120;
  }

  // reduce initial workload for users who rarely exercise
  if (profile.exercise_frequency.toLowerCase() === "rarely") {
    sets = Math.min(sets, 2);
  }

  // add workout targets to each selected exercise
  return selectedExercises.map((exercise) => {

    // cardio exercises use duration instead of sets and reps
    if (exercise.movement === "cardio") {
      return {
        ...exercise,
        durationMinutes:
          experience === "beginner" ? 10 : 20,
      };
    }

    // Mobility exercises use a short duration
    if (exercise.movement === "mobility") {
      return {
        ...exercise,
        durationMinutes: 5,
      };
    }

    // Resistance and core exercises use sets and reps
    return {
      ...exercise,
      sets,
      reps,
      restSeconds,
    };
  });
}
