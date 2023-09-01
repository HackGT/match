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

    const [{ data, loading, error }] = useAxios({
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

    console.log(data)

    useEffect(() => {
        if (!data) {
            setResultsText("Loading...");
        } else if (!Array.isArray(data) || data.length === 0) {
            setResultsText("No teams found");
        } else {
            setResultsText(`Showing ${data.length} teams`);
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
        if (!data || data.offset === undefined || data.total === undefined) {
            return false;
        }
        return data.total > data.offset;
    }, [data]);

    if (loading) return <LoadingScreen />;
    if (error) return <ErrorScreen error={error} />;

    return (
        <div>
            <br />
            <Box paddingLeft={"5%"} paddingRight={"5%"}>
                <Text fontSize={32}>Teams</Text>
                <br />
                <Flex flexWrap="wrap" justifyContent="space-evenly">
                    {Array.isArray(data) && data.map((team: TeamCardType) => (
                        <TeamCard key={team.name} {...team} />
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
