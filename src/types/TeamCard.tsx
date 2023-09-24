import { UserCardType } from "./UserCard";

export interface TeamListType {
  teams: TeamCardType[];
}

export type TeamCardType = {
  id?: BigInteger;
  name: string;
  hexathon?: string;
  members: UserCardType[];
  description: string;
  public: boolean;
  memberRequests?: { memberId: string; message: string }[];
  sentInvites?: { memberId: string; message: string }[];
};
