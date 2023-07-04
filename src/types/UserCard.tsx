export interface UserListType {
  users: UserCardType[];
}

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
  profile: {
    matched?: boolean;
    school: string;
    year: string;
    major: string;
    description: string;
    commitmentLevel: string;
    skills: string[];
    isJudging?: boolean;
  };
};
