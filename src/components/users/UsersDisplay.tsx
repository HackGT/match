import React, { useEffect, useMemo, useState } from "react";
import { Flex, Text, Box, useBreakpointValue, Button, ButtonGroup, HStack } from "@chakra-ui/react";
import { UserCardType } from "../../types/UserCard";
import UserCard from "./UserCard";
import { ErrorScreen, Service, apiUrl, useAuth } from "@hex-labs/core";
import useAxios from "axios-hooks";
import { limit } from "../outline/Display";

interface Props {
  skills: string[];
  commitmentLevel: string[];
  school: string[];
  search: string;
  usersOffset: number;
  setUsersOffset: any;
}

const UsersDisplay: React.FC<Props> = ({
  skills,
  commitmentLevel,
  school,
  search,
  usersOffset,
  setUsersOffset,
}) => {
  const { user } = useAuth();

  const isMobile = useBreakpointValue({ base: true, md: false });
  const [resultsText, setResultsText] = useState("Loading...");

  const [{ data, error }, refetch] = useAxios({
    method: "GET",
    url: apiUrl(Service.HEXATHONS, `/hexathon-users/${process.env.REACT_APP_HEXATHON_ID}/users`),
    params: {
      matched: true,
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

  if (error) return <ErrorScreen error={error} />;

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

  return (
    <>
      <Box paddingTop={"2.5%"} paddingBottom={"2.5%"} paddingLeft={"5%"} paddingRight={"5%"}>
        <Flex flexWrap="wrap" justifyContent="space-evenly">
          {data?.hexathonUsers
            .filter((hUser: any) => hUser.userId !== user?.uid)
            .map((user: UserCardType) => <UserCard key={user.name} {...user} />)}
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
