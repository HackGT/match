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

    const [{ data: tData, error: tError }] = useAxios({
        method: "GET",
        url: apiUrl(Service.HEXATHONS, `/teams`),
        params: {
            hexathon: process.env.REACT_APP_HEXATHON_ID,
        },
    });

    
    // tData?.teams.forEach((team: { name: any; description: any; members: any[]; }) => {
    //     console.log(`Team Name: ${team.name}`);
    //     console.log(`Description: ${team.description}`);
    //   });
    

    useEffect(() => {
        if (!tData) {
          setResultsText("Showing 0 results");
        } else if (
            tData.offset === undefined ||
            tData.total === undefined ||
            tData.teams.length === 0
        ) {
          setResultsText(`Showing ${tData.teams.length} results`);
        } else {
          setResultsText(
            `Showing ${tData.offset + 1} to ${tData.offset + tData.teams.length} of ${
                tData.total
            } results`
          );
        }
      }, [tData]);

    if (tError) return <ErrorScreen error={tError} />;

    const onPreviousClicked = () => {
        setUsersOffset(usersOffset - limit);
    };

    const onNextClicked = () => {
        setUsersOffset(usersOffset + limit);
    };

    const hasPrevious = useMemo(() => {
        if (!tData || tData.offset === undefined) {
            return false;
        }
        return tData.offset && tData.offset > 0;
    }, [tData]);

    const hasNext = useMemo(() => {
        if (!tData || tData.offset === undefined || tData.total === undefined || !tData) {
            return false;
        }
        return tData.total > tData.offset + tData.teams.length;
    }, [tData]);

    return (
        <div>
            <br></br>
            <Box paddingLeft={"5%"} paddingRight={"5%"}>
                <Text fontSize={32}>{title}</Text>
                <br></br>
                <Flex flexWrap="wrap" justifyContent="space-evenly">
                    {tData?.teams
                        .filter((hUser: any) => hUser.userId !== user?.uid)
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
