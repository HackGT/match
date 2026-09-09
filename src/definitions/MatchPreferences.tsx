export type matchPreferenceType = { value: string; label: string };

export const ExperienceLevels: matchPreferenceType[] = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

export const TeamStyles: matchPreferenceType[] = [
  { value: "experiment", label: "Experiment with new tech" },
  { value: "chill", label: "Have a great chill time" },
  { value: "competitive", label: "Build something competitive" },
];