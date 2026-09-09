import React, { useEffect, useMemo, useState } from "react";
import {
  Flex,
  Text,
  Box,
  useBreakpointValue,
  Button,
  ButtonGroup,
  HStack,
  Center,
  Spinner,
  Tag,
} from "@chakra-ui/react";
import { UserCardType, UserProfileType } from "../../types/UserCard";
import UserCard from "./UserCard";
import { ErrorScreen, Service, apiUrl, useAuth } from "@hex-labs/core";
import useAxios from "axios-hooks";
import { limit } from "../outline/Display";
import { getMatchScore } from "../../util/matching";

interface Props {
  skills: string[];
  commitmentLevel: string[];
  school: string[];
  search: string;
  usersOffset: number;
  setUsersOffset: any;
  currentProfile?: UserProfileType;
}

const UsersDisplay: React.FC<Props> = ({
  skills,
  commitmentLevel,
  school,
  search,
  usersOffset,
  setUsersOffset,
  currentProfile,
}) => {
  const { user } = useAuth();

  const isMobile = useBreakpointValue({ base: true, md: false });
  const [resultsText, setResultsText] = useState("Loading...");
  const [showMatches, setShowMatches] = useState(false);

  const [{ data, error, loading }, refetch] = useAxios({
    method: "GET",
    url: apiUrl(Service.HEXATHONS, `/hexathon-users/${process.env.REACT_APP_HEXATHON_ID}/users`),
    params: {
      // matched: true,
      skills,
      commitmentLevel,
      school,
      search,
      offset: usersOffset,
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (!data) {
      setResultsText("Showing 0 results");
    } else if (
      data.offset === undefined ||
      data.total === undefined ||
      data.hexathonUsers.length === 0
    ) {
      setResultsText(`Showing ${data.hexathonUsers.length} results`);
    } else {
      setResultsText(
        `Showing ${data.offset + 1} to ${data.offset + data.hexathonUsers.length} of ${
          data.total
        } results`
      );
    }
  }, [data]);

  const onPreviousClicked = () => {
    setUsersOffset(usersOffset - limit);
  };

  const onNextClicked = () => {
    setUsersOffset(usersOffset + limit);
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
    return data.total > data.offset + data.hexathonUsers.length;
  }, [data]);

  const displayedUsers = useMemo(() => {
    const users: (UserCardType & { matchScore: number })[] = (data?.hexathonUsers || [])
      .filter((hUser: UserCardType) => hUser.userId !== user?.uid)
      .map((hUser: UserCardType) => ({
        ...hUser,
        matchScore: getMatchScore(hUser.profile, currentProfile),
      }));

    return showMatches
      ? users
          .filter(matchedUser => matchedUser.matchScore > 0)
          .sort((firstUser, secondUser) => secondUser.matchScore - firstUser.matchScore)
      : users;
  }, [currentProfile, data, showMatches, user?.uid]);

  if (error) return <ErrorScreen error={error} />;
  if (loading)
    return (
      <Center py={10}>
        <Spinner size="xl" thickness="4px" color="#7B69EC" />
      </Center>
    );

  return (
    <>
      <Box paddingTop={"2.5%"} paddingBottom={"2.5%"} paddingLeft={"5%"} paddingRight={"5%"}>
        <Flex alignItems="center" justifyContent="space-between" mb={4}>
          <Text fontWeight="semibold">{showMatches ? "Your best matches" : "All hackers"}</Text>
          <Button size="sm" variant={showMatches ? "solid" : "outline"} onClick={() => setShowMatches(!showMatches)}>
            {showMatches ? "Show everyone" : "Best matches"}
          </Button>
        </Flex>
        <Flex flexWrap="wrap" justifyContent="space-evenly" gap={4}>
          {displayedUsers.map((user: UserCardType) => <UserCard key={user.userId || user.name} {...user} />)}
          {showMatches && displayedUsers.length === 0 && (
            <Tag colorScheme="purple" p={3}>Complete your profile and add skills to discover matches.</Tag>
          )}
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

export default UsersDisplay;
