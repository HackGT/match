type commitmentLevelType = { value: string, label: string };

const CommitmentLevels : commitmentLevelType[] = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" }
];

const commitmentLevelColors: Record<string, string> = {
  Low: "red.400",
  Medium: "yellow.400",
  High: "green.400",
};

export { CommitmentLevels, commitmentLevelColors }; 
export default CommitmentLevels; 
