import React, { useState } from "react";
import { Text, Button, Input, Heading, VStack, Box, useBreakpointValue } from "@chakra-ui/react";
import axios from "axios";
import { apiUrl, handleAxiosError, Service, useAuth } from "@hex-labs/core";
import { useParams } from "react-router-dom";

const CreateTeamSection: React.FC = () => {
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const hexathon = process.env.REACT_APP_HEXATHON_ID;
  const { user } = useAuth();

  const changeTeamName = (e: any) => {
    setTeamName(e.target.value);
  };

  const handleCreateTeam = async () => {
    try {
      setLoading(true);
      await axios.post(apiUrl(Service.HEXATHONS, "/teams/"), {
        name: teamName,
        hexathon,
        email: user?.email,
        description: "This is a team.",
        publicTeam: true,
      });
      window.location.reload();
    } catch (err: any) {
      handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      maxW="md"
      p={4}
      borderRadius="2px"
      boxShadow={{
        base: "rgba(0, 0, 0, 0.15) 0px 0px 6px 1px",
      }}
    >
      <VStack>
        <Heading textAlign="center" padding="20px 15px 0px 15px" size="md" lineHeight="inherit">
          You are not currently on a team.
        </Heading>
        <Text textAlign="center" padding="20px 20px 10px 20px">
          Create a team or browse teams created by fellow hackers and ask to team up!
        </Text>
      </VStack>
      <VStack spacing="20px" paddingBottom="30px">
        <Heading paddingTop="20px" size="md" lineHeight="inherit">
          Create a Team
        </Heading>
        <Input value={teamName} onChange={changeTeamName} placeholder="BeardellBears" />
        <Button
          onClick={handleCreateTeam}
          isLoading={loading}
          isDisabled={teamName.trim().length === 0}
        >
          Create team
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateTeamSection;
