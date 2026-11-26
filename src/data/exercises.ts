//Now that workoutPlan.ts determines which days users work out and 
// what type of workout they perform, we actually need to define the actual exercises they can do so that is what
//this file exercises.ts is for. 


// We want some common properties to define the specific exercise, we don't want all squats:
// {
//   id: "chair_squat",
//   name: "Chair Squat",
//   movement: "squat",
//   difficulty: "beginner",
//   equipment: "none",
// }

// | is a union type, meaning that the property can be one of the 3 listed values, ex: no "expert" difficulty
export type Experience = "beginner" | "intermediate" | "advanced";

//export type Equipment = "none" | "dumbbell" | "barbell";
//export type Movement = "squat" | "push" | "pull" | "hinge" | "core" | "cardio";

// categories of movements used to organize exercises, space attrivuted with each
export type Movement =
  | "squat"
  | "push"
  | "pull"
  | "hinge"
  | "core"
  | "cardio"
  | "mobility";

// equipment categories 
export type Equipment =
  | "none"
  | "dumbbell"
  | "barbell"
  | "machine"
  | "resistance_band";

// every exercise has properties associated with them
export type Exercise = {
  id: string;
  name: string;
  movement: Movement;
  difficulty: Experience;
  equipment: Equipment;
};


//What are the actual exercises? Below, we could create an exercise library TODO: add exercises
//Added exercises: 7 movement categories, 20 exercises so far, need to add more exercises to each category

// Could use this open-source dataset (credit it of course): https://github.com/hasaneyldrm/exercises-dataset/tree/main


// Exercise for MVP
// Each exercise has a movement category, difficulty, and equipment requirement. 
//Going to find a resource with 
export const exercises: Exercise[] = [

  // Squats
  {
    id: "chair_squat",
    name: "Chair Squat",
    movement: "squat",
    difficulty: "beginner",
    equipment: "none",
  },
  {
    id: "goblet_squat",
    name: "Goblet Squat",
    movement: "squat",
    difficulty: "intermediate",
    equipment: "dumbbell",
  },
  {
    id: "barbell_squat",
    name: "Barbell Back Squat",
    movement: "squat",
    difficulty: "advanced",
    equipment: "barbell",
  },

  // push movements
  {
    id: "incline_pushup",
    name: "Incline Push-Up",
    movement: "push",
    difficulty: "beginner",
    equipment: "none",
  },
  {
    id: "pushup",
    name: "Push-Up",
    movement: "push",
    difficulty: "intermediate",
    equipment: "none",
  },
  {
    id: "bench_press",
    name: "Barbell Bench Press",
    movement: "push",
    difficulty: "advanced",
    equipment: "barbell",
  },

  // pull movements
  {
    id: "band_row",
    name: "Resistance Band Row",
    movement: "pull",
    difficulty: "beginner",
    equipment: "resistance_band",
  },
  {
    id: "dumbbell_row",
    name: "Dumbbell Row",
    movement: "pull",
    difficulty: "intermediate",
    equipment: "dumbbell",
  },
  {
    id: "pullup",
    name: "Pull-Up",
    movement: "pull",
    difficulty: "advanced",
    equipment: "machine",
  },

  // hinge type movements
  {
    id: "glute_bridge",
    name: "Glute Bridge",
    movement: "hinge",
    difficulty: "beginner",
    equipment: "none",
  },
  {
    id: "dumbbell_rdl",
    name: "Dumbbell Romanian Deadlift",
    movement: "hinge",
    difficulty: "intermediate",
    equipment: "dumbbell",
  },
  {
    id: "barbell_rdl",
    name: "Barbell Romanian Deadlift",
    movement: "hinge",
    difficulty: "advanced",
    equipment: "barbell",
  },

  // core movements
  {
    id: "dead_bug",
    name: "Dead Bug",
    movement: "core",
    difficulty: "beginner",
    equipment: "none",
  },
  {
    id: "plank",
    name: "Plank",
    movement: "core",
    difficulty: "intermediate",
    equipment: "none",
  },
  {
    id: "side_plank",
    name: "Side Plank",
    movement: "core",
    difficulty: "advanced",
    equipment: "none",
  },

  // cardio
  {
    id: "walking",
    name: "Brisk Walking",
    movement: "cardio",
    difficulty: "beginner",
    equipment: "none",
  },
  {
    id: "jogging",
    name: "Jogging",
    movement: "cardio",
    difficulty: "intermediate",
    equipment: "none",
  },
  {
    id: "running",
    name: "Running",
    movement: "cardio",
    difficulty: "advanced",
    equipment: "none",
  },

  // mobility/stretching
  {
    id: "cat_cow",
    name: "Cat-Cow Stretch",
    movement: "mobility",
    difficulty: "beginner",
    equipment: "none",
  },
  {
    id: "hip_mobility",
    name: "Hip Mobility Routine",
    movement: "mobility",
    difficulty: "intermediate",
    equipment: "none",
  },
];
