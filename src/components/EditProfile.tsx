import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Heading,
  Stack,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Container,
  Checkbox, 
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@hex-labs/core";
import axios from "axios";
import { CommitmentLevels, Skills } from "../definitions";
import { skillType } from "../definitions/Skills";
import { commitmentLevelType } from "../definitions/CommitmentLevels";
import { GroupBase, Select } from "chakra-react-select";

type Profile = {
  matched: boolean;
  skills: string[];
  description: string;
  commitmentLevel: string;
};

const EditProfile: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const hexathonId = process.env.REACT_APP_HEXATHON_ID;
  const userId = "atS6IAumjxejVaEJYKrBKHXxVFO2";
  // const userId = user?.uid;
  const [skills, setSkills ] = useState<string[]>([]);
  const [commitmentLevel, setCommitmentLevel ] = useState<string>("");
  const [ profile, setProfile ] = useState<Profile>();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.get(
          `https://hexathons.api.hexlabs.org/hexathon-users/${hexathonId}/users/${userId}`
        );
        setProfile(res.data.profile)
        } catch (e: any) {
          console.log(e.message);
        }
    };

    getProfile();
  }, []);

    const {
      handleSubmit,
      register,
      reset,
      formState: {errors, isSubmitting},
    } = useForm({});

    /**
     * Generates initial default user profile based on current user profile.
     */
    useMemo(() => {
      if (!profile || Object.keys(profile).length === 0) {
        return {
          matched: false,
          description: "",
          commitmentLevel: "",
          skills: [],
        }
      } else {
        const updatedProfile = {
          matched: profile?.matched,
          description: profile?.description,
          commitmentLevel: profile?.commitmentLevel,
          skills: profile?.skills,
        };
        reset(updatedProfile);
        setSkills(Skills.filter(skill => updatedProfile.skills.includes(skill.value)).map(skill => skill.value) || []);
        setCommitmentLevel(CommitmentLevels.find(commitmentLevel => updatedProfile.commitmentLevel === commitmentLevel.value)?.value || "")
        return updatedProfile;
      }
    }, [user, profile, reset])

    const refetchProfile = async () => {
      const response = await axios.get(
        `https://hexathons.api.hexlabs.org/hexathon-users/${hexathonId}/users/${userId}`
      );
      setProfile(response.data.profile);
    };

    const onSubmit = async (values: any) => {
      try {
        values = {
          ...values,
          "skills": skills,
          "commitmentLevel": commitmentLevel,
        }
        const res = await axios.patch(
          `https://hexathons.api.hexlabs.org/hexathon-users/${hexathonId}/users/${userId}/profile`, values
        )

        await refetchProfile();
        navigate("/");
      } catch (e: any) {
        console.log(e.message);
      }
    };

    const handleChangeSkills = (e: any) => {
      let newSkills: string[] = [];
      if (e != null) {
        e.forEach((val: any) => {
          newSkills.push(val.value);
        })
      };
      setSkills(newSkills);
      console.log(skills);
    };

    const handleChangeLevel = (e: any) => {
      setCommitmentLevel(e.value);
      console.log(commitmentLevel);
    };

    return (
        <Container mt="8" width="25%" minW="300px">
          <VStack spacing="8" justify="center" marginY="24px">
            <Heading size="lg">Edit Profile</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing="6">
                <Stack spacing="5">
                  <FormControl>
                    <FormLabel>Skills</FormLabel>
                      <Select<skillType, true, GroupBase<skillType>>
                        id="skills"
                        name="skills"
                        placeholder="Select your skills"
                        options={Skills}
                        onChange={handleChangeSkills}
                        isMulti
                        value={Skills.filter(skill => skills.includes(skill.value))}
                      />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Description</FormLabel> {/* ??? max 200 chars */}
                    <Input
                      id="description"
                      type="text"
                      {...register("description")}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Commitment Level</FormLabel>
                    <Select<commitmentLevelType, true, GroupBase<commitmentLevelType>>
                      options={CommitmentLevels}
                      onChange={handleChangeLevel}
                      name="commitmentLevel"
                      value={CommitmentLevels.find(commLvl => commitmentLevel === commLvl.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <Checkbox id="matched" {...register("matched")}>I want to be featured in the team formation portal to meet other hackers.</Checkbox>
                  </FormControl>
                </Stack>
                <HStack
                  spacing={profile ? "16" : "0"}
                  justify="center"
                >
                  <Button
                    hidden={!profile}
                    type="reset"
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </Button>
                  <Button isLoading={isSubmitting} type="submit">
                    Save
                  </Button>
                </HStack>
              </Stack>
            </form>
          </VStack>
        </Container>
    )
};

export default EditProfile;