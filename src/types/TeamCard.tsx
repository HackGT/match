export interface TeamListType {
    teams: TeamCardType[];
  }
  
  export type TeamCardType = {
    id?: BigInteger;
    name: string;
    hexathon?: string;
    members: string[];
    description: string;
    public: boolean;
    memberRequests?: {userId: string, message: string}[];
  };
  