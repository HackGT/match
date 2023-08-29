import React, { useState, useEffect, useMemo } from "react";
import { Flex, Text, Box, useBreakpointValue, Button, ButtonGroup, HStack } from "@chakra-ui/react";
import { ErrorScreen, LoadingScreen, Service, apiUrl, useAuth } from "@hex-labs/core";
import useAxios from "axios-hooks";
import { TeamCardType } from "../../types/TeamCard";
import TeamCard from "./TeamCard";

interface Props {
    teamName: string;
    description: string;
    members: string[];
    search: string;
  }

  const TeamsDisplay: React.FC<Props> = ({
    teamName,
    description,
    members, 
    search,
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

    //   useEffect(() => {
    //     if (!data) {
    //       setResultsText("Showing 0 results");
    //     } else if (
    //       data.offset === undefined ||
    //       data.total === undefined ||
    //       data.hexathonUsers.length === 0
    //     ) {
    //       setResultsText(`Showing ${data.hexathonUsers.length} results`);
    //     } else {
    //       setResultsText(
    //         `Showing ${data.offset + 1} to ${data.offset + data.hexathonUsers.length} of ${
    //           data.total
    //         } results`
    //       );
    //     }
    //   }, [data]);
    
      if (loading) return <LoadingScreen />
      if (error) return <ErrorScreen error={error} />;

    return(
        <Text>Teams</Text>
    )
};

export default TeamsDisplay;