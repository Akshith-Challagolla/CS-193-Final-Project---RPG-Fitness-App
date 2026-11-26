//import required stuff from exercises and workoutPlan

import { Exercise, exercises, Movement } from "../data/exercises";
import { UserProfile } from "./workoutPlan";

//not exported, we don't need to 

function getWorkoutMovements(workout: string): Movement[] {

  // full body has full body a and full body b which is why we use .includes for anything having "Full Body" in it
  if (workout.includes("Full Body")) {
    return ["squat", "push", "pull", "hinge", "core"]; //standard array, could make const tuple
  }

  // All upper body exercises focus on pushing or pulling so we return the 
  if (workout.includes("Upper")) {
    return ["push", "pull"];
  }

  // Lower Body workouts focus on squats and hinges
  if (workout.includes("Lower")) {
    return ["squat", "hinge", "core"];
  }

  // Cardio paired with Mobility using && operator
  if (workout.includes("Cardio") && workout.includes("Mobility")) {
    return ["cardio", "mobility"];
  }

  if (
    workout.includes("Cardio") ||
    workout.includes("Intervals") ||
    workout.includes("Recovery Walk")
  ) {
    return ["cardio"];
  }

  if (workout.includes("Mobility")) {
    return ["mobility"];
  }

  // fallback case - any unrecognized workout category
  return [];

  //no separate conditions required for each fallback case: use .includes
}

//exported func selectExercises to get selection logic
export function selectExercises(
  workout: string,
  profile: UserProfile
): Exercise[] {

  // Find which movements this workout requires
  const movements = getWorkoutMovements(workout);

  // Get the user's experience level
  const experience = profile.experience.toLowerCase();

  // Store exercises selected for the workout
  const selectedExercises: Exercise[] = [];

  // Loop through each required movement
  for (const movement of movements) {

    // find suitable exercises for this movement
    // we only assume access to equipment-free exercises for now, in the future we can add equipment based
    // exercises actually using the github dataset from haseneylderm
    // const options = exercises.filter(
    //   (exercise) =>
    //     exercise.movement === movement &&
    //     exercise.equipment === "none"
    // );

    //Just added two new ways: dumbbel and barbell
    // Determine which equipment the user is comfortable using
    const allowedEquipment =
    profile.weight_comfort === "Not comfortable"
        ? ["none"]
        : profile.weight_comfort === "Somewhat comfortable"
        ? ["none", "dumbbell"]
        : ["none", "dumbbell", "barbell"];

    // Find exercises that match the movement and allowed equipment
    const options = exercises.filter(
    (exercise) =>
        exercise.movement === movement &&
        allowedEquipment.includes(exercise.equipment)
    );

    // look for an exercise matching experience first, as that is what will determine splits
    let selected = options.find(
      (exercise) => exercise.difficulty === experience
    );

    // if unavailable then use a simpler exercise (?? instead of what...)
    //This is inherently flawed though, fix this in the future (TODO)
    // if (!selected) {
    //   selected =
    //     options.find((exercise) => exercise.difficulty === "beginner") ??
    //     options.find((exercise) => exercise.difficulty === "intermediate");
    // }

    //Now, if an advanced doesn't have some barbell exercise, it won't have a default fallback to beginner insetad of
    // trying intermediate (it has to try each one level by level down 1)

    // If no exact difficulty match exists, choose another suitable level
    if (!selected) {
    const fallbackOrder =
        experience === "advanced"
        ? ["intermediate", "beginner"]
        : experience === "intermediate"
        ? ["beginner"]
        : []; //last

    selected = options.find((exercise) =>
        fallbackOrder.includes(exercise.difficulty)
    );
    }

    // add exercise only anf only if we found a good option
    if (selected) {
      selectedExercises.push(selected);
    }
  }

  return selectedExercises;
}



//does it work...
//console.log(selectExercises("Full Body A", testProfile));


