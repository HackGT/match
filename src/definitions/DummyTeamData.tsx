import { UserCardType } from "../types/UserCard";
import { TeamCardType } from "../types/TeamCard";

export const userData: UserCardType[] = [
    {
      userId: "1",
      name: "User 1",
      profile: {
        matched: true,
        school: "Georgia Institute of Technology",
        year: "3rd year",
        major: "Computer Science",
        description: "Hello, my name is bleh bleh bleh",
        commitmentLevel: "High",
        skills: ["Java", "Python", "Node"],
        isJudging: true,
      },
    },
    {
      userId: "2",
      name: "User 2",
      profile: {
        matched: true,
        school: "Western Illinois University",
        year: "2nd year",
        major: "Computational Media",
        description: "Hello, my name is bleh bleh bleh",
        commitmentLevel: "Medium",
        skills: ["C", "JavaScript"],
        isJudging: true,
      },
    },
    {
      userId: "3",
      name: "User 3",
      profile: {
        matched: true,
        school: "Georgia Institute of Technology",
        year: "1st year",
        major: "Computer Science",
        description: "Hello, my name is bleh bleh bleh",
        commitmentLevel: "Low",
        skills: ["React", "Node", "Express"],
        isJudging: true,
      },
    },
    {
      userId: "4",
      name: "User 4",
      profile: {
        matched: true,
        school: "University of California, Berkeley",
        year: "3rd year",
        major: "Computer Science",
        description: "Hello, my name is bleh bleh bleh",
        commitmentLevel: "High",
        skills: ["Machine Learning", "Python", "Node"],
        isJudging: true,
      },
    },
    {
      userId: "5",
      name: "User 5",
      profile: {
        matched: true,
        school: "University of Maryland, Baltimore County",
        year: "4th year",
        major: "Computer Science",
        description: "Hello, my name is bleh bleh bleh",
        commitmentLevel: "Medium",
        skills: ["HTML/CSS", "C#", "C++"],
        isJudging: true,
      },
    },
    {
      userId: "6",
      name: "User 6",
      profile: {
        matched: true,
        school: "Emory University",
        year: "3rd year",
        major: "Computer Science",
        description: "Hello, my name is bleh bleh bleh",
        commitmentLevel: "Low",
        skills: ["Java", "Python", "Node"],
        isJudging: true,
      },
    },
  ];

  export const teamData: TeamCardType[] = [
    {
      name: "Team 1",
      members: ["1", "3", "5"],
      description: "Hey, you! We're assembling a dynamic crew for the hackathon and we've got a mind-blowing project in our sights. If you're all about turning ideas into reality, we want you onboard. Our goal? To craft a slick app that makes life easier for busy students juggling classes, assignments, and social life. If you've got coding chops, design flair, or a knack for user experience, you're the missing piece. Join us for a whirlwind hackathon adventure where we code hard, laugh harder, and emerge with something truly awesome. Slide a message our way and let's conquer this challenge together!"
    },
    {
      name: "Team 2",
      members: ["2", "6"],
      description: "Team 2 description"
    }
  ];