import React, { useState } from "react";
import { Box, Checkbox, FormControl, FormLabel, Stack, Text } from "@chakra-ui/react";

// temporary profile data
const profiles = [
  { id: 1, matched: true, school: "Georgia Institute of Technology", year: "3rd year", major: "Computer Science", description: "Hello, my name is bleh bleh bleh", commitmentLevel: "high",  skills: ["Java", "Python", "Node"], isJudging: true },
  { id: 2, matched: true, school: "UGA", year: "2nd year", major: "Computational Media", description: "Hello, my name is bleh bleh bleh", commitmentLevel: "medium",  skills: ["C", "JavaScript"], isJudging: true },
  { id: 3, matched: true, school: "Georgia Institute of Technology", year: "1st year", major: "Computer Science", description: "Hello, my name is bleh bleh bleh", commitmentLevel: "low",  skills: ["React", "Node", "Express"], isJudging: true },
  { id: 4, matched: true, school: "USG", year: "3rd year", major: "Computer Science", description: "Hello, my name is bleh bleh bleh", commitmentLevel: "high",  skills: ["Machine Learning", "Python", "Node"], isJudging: true },
  { id: 5, matched: true, school: "University of Maryland", year: "4th year", major: "Computer Science", description: "Hello, my name is bleh bleh bleh", commitmentLevel: "medium",  skills: ["HTML/CSS", "C#", "C++"], isJudging: true },
  { id: 6, matched: true, school: "Emory", year: "3rd year", major: "Computer Science", description: "Hello, my name is bleh bleh bleh", commitmentLevel: "low",  skills: ["Java", "Python", "Node"], isJudging: true },
];

interface FiltersState {
    commitmentLevel: string[];
    skill: string[];
  }
  
  export default function Filters() {
    const [filters, setFilters] = useState<FiltersState>({
      commitmentLevel: [],
      skill: [],
    });

  const handleCommitmentLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const commitmentLevel = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        commitmentLevel: [...prevFilters.commitmentLevel, commitmentLevel],
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        commitmentLevel: prevFilters.commitmentLevel.filter((c) => c !== commitmentLevel),
      }));
    }
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skill = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        skill: [...prevFilters.skill, skill],
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        skill: prevFilters.skill.filter((s) => s !== skill),
      }));
    }
  };

  const filteredProfiles = profiles.filter((profile) => {
    if (filters.commitmentLevel.length > 0 && !filters.commitmentLevel.includes(profile.commitmentLevel)) {
      return false;
    }

    if (filters.skill.length > 0 && !profile.skills.some((s) => filters.skill.includes(s))) {
      return false;
    }

    return true;
  });

  return (
    <Box>
      <Box
            border = '2px'
            borderColor = 'gray.200'
            borderRadius = 'lg'
            color='gray.500'
            fontSize='xs'
            padding='3'
            margin='5'
            width='180px'
            ml='2'>
      <FormControl>
        <FormLabel>Commitment Level</FormLabel>
        <Stack spacing={2}>
          <Checkbox value="high" onChange={handleCommitmentLevelChange}>
            High
          </Checkbox>
          <Checkbox value="medium" onChange={handleCommitmentLevelChange}
          >
            Medium
          </Checkbox>
          <Checkbox value="low" onChange={handleCommitmentLevelChange}>
            Low
          </Checkbox>
        </Stack>
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Skills</FormLabel>
        <Stack spacing={2}>
          <Checkbox value="Android" onChange={handleSkillsChange}>
            Android
          </Checkbox>
          <Checkbox value="Bash" onChange={handleSkillsChange}>
            Bash
          </Checkbox>
          <Checkbox value="C" onChange={handleSkillsChange}>
            C
          </Checkbox>
          <Checkbox value="C#" onChange={handleSkillsChange}>
            C#
          </Checkbox>
          <Checkbox value="C++" onChange={handleSkillsChange}>
            C++
          </Checkbox>
          <Checkbox value="Go" onChange={handleSkillsChange}>
            Go
          </Checkbox>
          <Checkbox value="Hardware" onChange={handleSkillsChange}>
            Hardware
          </Checkbox>
          <Checkbox value="HTML/CSS" onChange={handleSkillsChange}>
            HTML/CSS
          </Checkbox>
          <Checkbox value="iOS" onChange={handleSkillsChange}>
            iOS
          </Checkbox>
          <Checkbox value="Java" onChange={handleSkillsChange}>
            Java
          </Checkbox>
          <Checkbox value="JavaScript" onChange={handleSkillsChange}>
            JavaScript
          </Checkbox>
          <Checkbox value="Kotlin" onChange={handleSkillsChange}>
            Kotlin
          </Checkbox>
          <Checkbox value="Machine Learning" onChange={handleSkillsChange}>
            Machine Learning
          </Checkbox>
          <Checkbox value="Node" onChange={handleSkillsChange}>
            Node
          </Checkbox>
          <Checkbox value="Perl" onChange={handleSkillsChange}>
            Perl
          </Checkbox>
          <Checkbox value="PHP" onChange={handleSkillsChange}>
            PHP
          </Checkbox>
          <Checkbox value="Python" onChange={handleSkillsChange}>
            Python
          </Checkbox>
          <Checkbox value="R" onChange={handleSkillsChange}>
            R
          </Checkbox>
          <Checkbox value="React" onChange={handleSkillsChange}>
            React
          </Checkbox>
          <Checkbox value="Robotics" onChange={handleSkillsChange}>
            Robotics
          </Checkbox>
          <Checkbox value="Ruby" onChange={handleSkillsChange}>
            Ruby
          </Checkbox>
          <Checkbox value="Rust" onChange={handleSkillsChange}>
            Rust
          </Checkbox>
          <Checkbox value="Scala" onChange={handleSkillsChange}>
            Scala
          </Checkbox>
          <Checkbox value="SQL" onChange={handleSkillsChange}>
            SQL
          </Checkbox>
          <Checkbox value="Swift" onChange={handleSkillsChange}>
            Swift
          </Checkbox>
          <Checkbox value="TypeScript" onChange={handleSkillsChange}>
            TypeScript
          </Checkbox>
        </Stack>
      </FormControl>
      </Box>
    </Box>
  );
};
