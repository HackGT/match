import React, { useState, useEffect, useMemo } from "react";
import { Flex, Text, Box, useBreakpointValue, Button, ButtonGroup, HStack } from "@chakra-ui/react";
import { ErrorScreen, LoadingScreen, Service, apiUrl, useAuth } from "@hex-labs/core";
import useAxios from "axios-hooks";
import { TeamCardType } from "../../types/TeamCard";
import TeamCard from "./TeamCard";
import { limit } from "../outline/Display";

interface Props {
    teamName: string;
    description: string;
    members: string[];
    search: string;
    usersOffset: number;
    setUsersOffset: any;
}

const TeamsDisplay: React.FC<Props> = ({
    teamName,
    description,
    members, 
    search,
    usersOffset,
    setUsersOffset,
}) => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const [resultsText, setResultsText] = useState("Loading...");
    const title = process.env.REACT_APP_EVENT_NAME;
    const { user } = useAuth();

    const [{ data, error }] = useAxios({
        method: "GET",
        url: apiUrl(Service.HEXATHONS, `/teams`),
        params: {
            matched: true,
            teamName,
            description,
            members, 
            search,
        },
    });

    useEffect(() => {
        if (!data) {
          setResultsText("Showing 0 results");
        } else if (
          data.offset === undefined ||
          data.total === undefined ||
          data.teams.length === 0
        ) {
          setResultsText(`Showing ${data.teams.length} results`);
        } else {
          setResultsText(
            `Showing ${data.offset + 1} to ${data.offset + data.teams.length} of ${
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
        return data.total > data.offset + data.teams.length;
    }, [data]);

    return (
        <div>
            <br></br>
            <Box paddingLeft={"5%"} paddingRight={"5%"}>
                <Text fontSize={32}>{title}</Text>
                <br></br>
                <Flex flexWrap="wrap" justifyContent="space-evenly">
                    {data?.teams
                        .map((user: TeamCardType) => <TeamCard key={user.name} {...user} />)}
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
                        <Button
                            isDisabled={!hasPrevious}
                            onClick={onPreviousClicked}
                            variant="outline"
                        >
                            Previous
                        </Button>
                        <Button
                            isDisabled={!hasNext}
                            onClick={onNextClicked}
                            variant="outline"
                        >
                            Next
                        </Button>
                    </ButtonGroup>
                </HStack>
            </Box>
        </div>
    );
};

export default TeamsDisplay;
