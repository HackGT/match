import React, { useEffect, useState } from "react";
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
  useToast,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  LoadingScreen,
  apiUrl,
  useAuth,
  Service,
  ErrorScreen,
  handleAxiosError,
} from "@hex-labs/core";
import axios from "axios";
import { CommitmentLevels, Skills } from "../definitions";
import { skillType } from "../definitions/Skills";
import { commitmentLevelType } from "../definitions/CommitmentLevels";
import { GroupBase, Select } from "chakra-react-select";
import useAxios from "axios-hooks";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import NotRegisteredErrorScreen from "../screens/NotRegisteredErrorScreen";

const EditProfile: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const title = process.env.REACT_APP_EVENT_NAME;
  const hexathonId = process.env.REACT_APP_HEXATHON_ID;
  const userId = user?.uid;
  const [skills, setSkills] = useState<string[]>([]);
  const [commitmentLevel, setCommitmentLevel] = useState<string>("");

  const [{ data, loading, error }, refetch] = useAxios({
    url: apiUrl(Service.HEXATHONS, `/hexathon-users/${hexathonId}/users/${userId}`),
    method: "GET",
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm({});

  useEffect(() => {
    if (data) {
      setSkills(
        Skills.filter(skill => data.profile.skills.includes(skill.value)).map(
          skill => skill.value
        ) || []
      );
      setCommitmentLevel(data.profile.commitmentLevel);
      reset({
        ...data.profile,
        skills,
        commitmentLevel,
      });
    }
  }, [data, reset]);

  if (loading) return <LoadingScreen />;
  if (error) {
    if (!data) return <NotRegisteredErrorScreen />;
    return <ErrorScreen error={error} />;
  }

  const onSubmit = async (values: any) => {
    try {
      values = {
        ...values,
        skills: skills,
        commitmentLevel: commitmentLevel,
      };
      await axios.patch(
        apiUrl(Service.HEXATHONS, `/hexathon-users/${hexathonId}/users/${userId}/profile`),
        values
      );
      toast({
        title: "Success!",
        description: "Your profile has been successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (e: any) {
      handleAxiosError(e);
    }
    await refetch();
    navigate("/");
  };

  const handleChangeSkills = (e: any) => {
    if (e.length > 5) {
      toast({
        title: "Error",
        description: "You can only select up to 5 skills.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    let newSkills: string[] = [];
    if (e != null) {
      e.forEach((val: any) => {
        newSkills.push(val.value);
      });
    }
    setSkills(newSkills);
  };

  const handleChangeCommitmentLevel = (e: any) => setCommitmentLevel(e.value);

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
                <Flex alignItems="start">
                  <InfoOutlineIcon m="1" boxSize={3} color="#858585" />
                  <Text fontSize="xs" color="#858585">
                    Choose atmost 5 skills most relevant to what you intend to use during {title}
                  </Text>
                </Flex>
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input id="description" type="text" {...register("description")} maxLength={200} />
              </FormControl>
              <FormControl>
                <FormLabel>Commitment Level</FormLabel>
                <Select<commitmentLevelType, true, GroupBase<commitmentLevelType>>
                  options={CommitmentLevels}
                  onChange={handleChangeCommitmentLevel}
                  name="commitmentLevel"
                  value={CommitmentLevels.find(commLvl => commitmentLevel === commLvl.value)}
                />
              </FormControl>
              <FormControl>
                <Checkbox id="matched" {...register("matched")}>
                  I want to be featured in the team formation portal to meet other hackers.
                </Checkbox>
              </FormControl>
            </Stack>
            <HStack spacing={data.profile ? "16" : "0"} justify="center">
              <Button hidden={!data.profile} type="reset" onClick={() => navigate("/")}>
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
  );
};

export default EditProfile;
