import { UserProfileType } from "../types/UserCard";

export const getMatchScore = (profile: UserProfileType, currentProfile?: UserProfileType) => {
  if (!currentProfile) return 0;

  let score = 0;
  const sharedSkills = profile.skills.filter(skill => currentProfile.skills.includes(skill));

  score += sharedSkills.length * 3;
  if (
    profile.experienceLevel &&
    currentProfile.experienceLevel &&
    profile.experienceLevel === currentProfile.experienceLevel
  ) {
    score += 3;
  }
  if (profile.teamStyle && profile.teamStyle === currentProfile.teamStyle) {
    score += 4;
  }

  return score;
};