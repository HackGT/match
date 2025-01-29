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
  Select,
} from "@chakra-ui/react";
import { ErrorScreen, Service, apiUrl, useAuth } from "@hex-labs/core";
import { TeamCardType } from "../../types/TeamCard";
import TeamCard from "./TeamCard";
import { limit } from "../outline/Display";
import useAxios from "axios-hooks";
import CreateTeamSection from "./sections/CreateTeamSection";
import OnTeamSection from "./sections/OnTeamSection";
import axios from "axios";

interface Props {
  search: string;
  teamsOffset: number;
  setTeamsOffset: any;
}

const TeamsDisplay: React.FC<Props> = ({ search, teamsOffset, setTeamsOffset }) => {
  const { user } = useAuth();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [resultsText, setResultsText] = useState("Loading...");
  const [memberCount, setMemberCount] = useState<string>("");
  const [teamsData, setTeamsData] = useState<any>(null);

  // const [{ teamsData }] = useAxios({
  //   method: "GET",
  //   url: apiUrl(Service.HEXATHONS, `/teams`),
  //   params: {
  //     hexathon: process.env.REACT_APP_HEXATHON_ID,
  //     search,
  //     offset: teamsOffset,
  //   },
  // });

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(apiUrl(Service.HEXATHONS, `/teams`), {
          params: {
            hexathon: process.env.REACT_APP_HEXATHON_ID,
            search,
            offset: teamsOffset,
            memberCount: memberCount || undefined,
          },
        });
        setTeamsData(response.data);
      } catch (error) {
        console.error("Error fetching teams", error);
      }
    };

    fetchTeams();
  }, [search, teamsOffset, memberCount]);

  const [{ data: userTeamData }] = useAxios({
    method: "GET",
    url: apiUrl(Service.HEXATHONS, `/teams`),
    params: {
      hexathon: process.env.REACT_APP_HEXATHON_ID,
      userId: user?.uid,
    },
  });

  useEffect(() => {
    if (!teamsData) {
      setResultsText("Showing 0 results");
    } else if (
      teamsData.offset === undefined ||
      teamsData.total === undefined ||
      teamsData.teams.length === 0
    ) {
      setResultsText(`Showing ${teamsData.teams.length} results`);
    } else {
      setResultsText(
        `Showing ${teamsData.offset + 1} to ${teamsData.offset + teamsData.teams.length} of ${teamsData.total} results`
      );
    }
  }, [teamsData]);

  const onPreviousClicked = () => {
    setTeamsOffset(teamsOffset - limit);
  };

  const onNextClicked = () => {
    setTeamsOffset(teamsOffset + limit);
  };

  const hasPrevious = useMemo(() => {
    if (!teamsData || teamsData.offset === undefined) {
      return false;
    }
    return teamsData.offset && teamsData.offset > 0;
  }, [teamsData]);

  const hasNext = useMemo(() => {
    if (
      !teamsData ||
      teamsData.offset === undefined ||
      teamsData.total === undefined ||
      !teamsData
    ) {
      return false;
    }
    return teamsData.total > teamsData.offset + teamsData.teams.length;
  }, [teamsData]);

  return (
    <>
      <Center>
        {userTeamData && (
          <Center flexDir="column">
            {userTeamData.total > 0 ? (
              <OnTeamSection team={userTeamData.teams[0]} members={userTeamData.teams[0].members} />
            ) : (
              <CreateTeamSection />
            )}
          </Center>
        )}
      </Center>
      <Box paddingTop={"1.5%"} paddingBottom={"2.5%"} paddingLeft={"5%"} paddingRight={"5%"}>
        <Select placeholder="Filter by team size" onChange={e => setMemberCount(e.target.value)}>
          <option value="1">1 Member</option>
          <option value="2">2 Members</option>
          <option value="3">3 Members</option>
          <option value="4">4+ Members</option>
        </Select>
        <br></br>
        <Flex flexWrap="wrap" justifyContent="space-evenly">
          {teamsData?.teams
            .filter(
              (team: TeamCardType) =>
                !memberCount ||
                (memberCount === "4"
                  ? team.members.length >= 4
                  : team.members.length === parseInt(memberCount, 10))
            )
            .map((team: TeamCardType) => <TeamCard key={team.name} {...team} />)}
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
