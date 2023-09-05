export type commitmentLevelType = { value: string; label: string };

export const CommitmentLevels: commitmentLevelType[] = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

export const commitmentLevelColors: Record<string, string> = {
  Low: "red.400",
  Medium: "yellow.400",
  High: "green.400",
};
