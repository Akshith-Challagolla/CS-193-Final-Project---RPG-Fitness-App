
import { workoutTemplates } from "../data/workoutTemplates";

export type UserProfile = {
  experience: string;
  weight_comfort: string;
  exercise_frequency: string;
  commitment: string;
  fitness_goal: string;
};

export type WorkoutDay = {
  day: string;
  workout: string;
  description: string;
  isRest: boolean;
};

//Days variable, array of strings of the days of the week (M - S)
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// The indices tell us which days have workouts.
// Monday = 0, Tuesday = 1, etc.
const workoutDays: Record<number, number[]> = {
  2: [0, 3],
  3: [0, 2, 4],
  4: [0, 1, 3, 5],
  5: [0, 1, 2, 4, 5],
};

// Templates for different fitness goals - Deleted and replaced with workoutTemplates (imported above)

export function generateWorkoutPlan(
  profile: UserProfile
): WorkoutDay[] {

  // Converting commitment answer to a number
  const requestedDays =
    profile.commitment === "5+ days"
      ? 5
      : parseInt(profile.commitment, 10);

  // Convert commitment into number of training days
  // Make sure the number is supported by our workout templates (2, 3, 4, or 5)
  // If the answer is invalid, default to 3 days
  const numDays = [2, 3, 4, 5].includes(requestedDays)
    ? requestedDays
    : 3;

  // Find which days of the week should contain workouts
  // For example, 3 days corresponds to Monday, Wednesday, and Friday
  const selectedDays = workoutDays[numDays] ?? workoutDays[3];

  //We are using optional chaining (?.) to safely access the nested properties of the workoutTemplates object and then ?? is like a fallback if that requested
  //template is not found. It will default to the "General fitness" template with 3 days of workouts (??)

  //Future stuff to fix: this doesn't provide fallback for 4, 5 days of workouts for "General fitness" template. 
  const goalWorkouts =
    workoutTemplates[profile.fitness_goal]?.[numDays] ??
    workoutTemplates["General fitness"][3];

  // Beginners and previously inactive users start gently
  const easyStart =
    profile.experience === "Beginner" ||
    profile.exercise_frequency === "Rarely";

  // Use the user's comfort with weights
  const equipment =
    profile.weight_comfort === "Not comfortable"
      ? "Bodyweight or equipment-free"
      : profile.weight_comfort === "Somewhat comfortable"
      ? "Bodyweight or light weights"
      : "Weights or bodyweight";

  let workoutIndex = 0;

  return days.map((day, index) => {

    // Rest day
    if (!selectedDays.includes(index)) {
      return {
        day,
        workout: "Rest",
        description: "Rest and recovery",
        isRest: true,
      };
    }

    // Workout day
    // Take the next workout from the selected goal and commitment template
    const workout = goalWorkouts[workoutIndex];
    workoutIndex++;

    return {
      day,
      workout,
      description: `${
        easyStart ? "Gentle starting session" : "Regular training session"
      } • ${equipment}`,
      isRest: false,
    };
  });
}
