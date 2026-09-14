export interface UserListType {
  users: UserCardType[];
}

export type UserProfileType = {
  matched?: boolean;
  school: string;
  year: string;
  major: string;
  description: string;
  commitmentLevel: string;
  skills: string[];
  experienceLevel?: string;
  teamStyle?: string;
  isJudging?: boolean;
};

export type UserCardType = {
  userId?: string;
  email?: string;
  name: string;
  hexathon?: string;
  points?: Object;
  address?: string;
  validAddress?: string;
  trackingLabel?: string;
  purchasedSwagItems?: Object;
  profile: UserProfileType;
  matchScore?: number;
};
