//Put in template for workout plan, this is predefined information (no calculations inside this file)
//Store different workout 'templates' for the different fitness goals. #'s represet the number of days per week the user wants to workout. E
// and each template is an array of strings, each string is a workout for that day.
// outer object is keyed by string, inner is keyed by a number
export const workoutTemplates: Record<
  string,
  Record<number, string[]>
> = {
  "Build muscle": {
    2: ["Full Body A", "Full Body B"],
    3: ["Full Body A", "Full Body B", "Full Body A"],
    4: ["Upper Body", "Lower Body", "Upper Body", "Lower Body"],
    5: [
      "Upper Body",
      "Lower Body",
      "Cardio / Mobility",
      "Upper Body",
      "Lower Body",
    ],
  },

  "Build strength": {
    2: ["Full Body Strength A", "Full Body Strength B"],
    3: [
      "Full Body Strength A",
      "Full Body Strength B",
      "Full Body Strength A",
    ],
    4: [
      "Upper Strength",
      "Lower Strength",
      "Upper Strength",
      "Lower Strength",
    ],
    5: [
      "Upper Strength",
      "Lower Strength",
      "Easy Cardio",
      "Upper Strength",
      "Lower Strength",
    ],
  },

  "Improve endurance": {
    2: ["Easy Cardio", "Full Body"],
    3: ["Easy Cardio", "Full Body", "Long Easy Cardio"],
    4: ["Easy Cardio", "Full Body", "Intervals", "Long Easy Cardio"],
    5: [
      "Easy Cardio",
      "Full Body",
      "Recovery Walk",
      "Intervals",
      "Long Easy Cardio",
    ],
  },

  "General fitness": {
    2: ["Full Body", "Full Body + Cardio"],
    3: ["Full Body", "Cardio", "Full Body"],
    4: ["Full Body", "Cardio", "Full Body", "Mobility"],
    5: ["Full Body", "Cardio", "Full Body", "Cardio", "Mobility"],
  },
};
