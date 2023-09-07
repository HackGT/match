import React, { useState, useEffect, useMemo } from "react";
import {
  Flex,
  Text,
  Box,
  useBreakpointValue,
  Button,
  ButtonGroup,
  HStack,
  Center,
} from "@chakra-ui/react";
import { ErrorScreen, LoadingScreen, Service, apiUrl, useAuth } from "@hex-labs/core";
import { TeamCardType } from "../../types/TeamCard";
import TeamCard from "./TeamCard";
import { limit } from "../outline/Display";
import useAxios from "axios-hooks";
import CreateTeamSection from "./sections/CreateTeamSection";
import OnTeamSection from "./sections/OnTeamSection";

interface Props {
  data: any;
  membersData: Record<string, any>;
  search: string;
  teamsOffset: number;
  setTeamsOffset: any;
}

const TeamsDisplay: React.FC<Props> = ({ data, membersData, teamsOffset, setTeamsOffset }) => {
  const { user } = useAuth();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [resultsText, setResultsText] = useState("Loading...");

  const [{ data: userTeamData, error }] = useAxios({
    method: "GET",
    url: apiUrl(Service.HEXATHONS, `/teams`),
    params: {
      hexathon: process.env.REACT_APP_HEXATHON_ID,
      userId: user?.uid,
    },
  });

  if (error) return <ErrorScreen error={error} />;

  useEffect(() => {
    if (!data) {
      setResultsText("Showing 0 results");
    } else if (data.offset === undefined || data.total === undefined || data.teams.length === 0) {
      setResultsText(`Showing ${data.teams.length} results`);
    } else {
      setResultsText(
        `Showing ${data.offset + 1} to ${data.offset + data.teams.length} of ${data.total} results`
      );
    }
  }, [data]);

  const onPreviousClicked = () => {
    setTeamsOffset(teamsOffset - limit);
  };

  const onNextClicked = () => {
    setTeamsOffset(teamsOffset + limit);
  };

  const hasPrevious = useMemo(() => {
    if (!data || data.offset === undefined) {
      return false;
    }
    return data.offset && data.offset > 0;
  }, [data]);

  const hasNext = useMemo(() => {
    if (!data || data.offset === undefined || data.total === undefined || !data) {
      return false;
    }
    return data.total > data.offset + data.teams.length;
  }, [data]);

  const teamsLoaded = useMemo(() => {
    return membersData && data && membersData.length === data.length;
  }, [membersData, data]);

  if (!teamsLoaded) return <LoadingScreen />;

  return (
    <>
      <Center>
        <Box
          width={{ base: "90vw", md: "70vw" }}
          marginTop="40px"
          borderRadius="2px"
          boxShadow={{
            base: "rgba(0, 0, 0, 0.15) 0px 0px 6px 1px",
          }}
          paddingBottom="30px"
        >
          <Center flexDir="column">
            {userTeamData && userTeamData.total > 0 ? (
              <OnTeamSection
                team={userTeamData.teams[0]}
                members={membersData[userTeamData.teams[0].name]}
              />
            ) : (
              <CreateTeamSection />
            )}
          </Center>
        </Box>
      </Center>
      <Box paddingTop={"1.5%"} paddingLeft={"5%"} paddingRight={"5%"}>
        <br></br>
        <Flex flexWrap="wrap" justifyContent="space-evenly">
          {teamsLoaded &&
            data?.teams.map((team: TeamCardType) => (
              <TeamCard key={team.name} {...team} memberData={membersData[team.name]} />
            ))}
        </Flex>
      </Box>
      <Box px={{ base: "4", md: "6" }} pb="5">
        <HStack spacing="3" justify="space-between">
          {!isMobile && (
            <Text color="muted" fontSize="sm">
              {resultsText}
            </Text>
          )}
          <ButtonGroup
            spacing="3"
            justifyContent="space-between"
            width={{ base: "full", md: "auto" }}
            variant="secondary"
          >
            <Button isDisabled={!hasPrevious} onClick={onPreviousClicked} variant="outline">
              Previous
            </Button>
            <Button isDisabled={!hasNext} onClick={onNextClicked} variant="outline">
              Next
            </Button>
          </ButtonGroup>
        </HStack>
      </Box>
    </>
  );
};

export default TeamsDisplay;
