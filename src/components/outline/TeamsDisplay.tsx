import React, { useState, useEffect, useMemo } from "react";
import { Card, Flex, Input, Text, Box, CardBody } from "@chakra-ui/react";
import { apiUrl, Service, ErrorScreen, useAuth } from "@hex-labs/core";
import { TeamCardType } from "../../types/TeamCard";
import { teamData } from "../../definitions/DummyTeamData";


const TeamsDisplay: React.FC = () =>{
    const title = process.env.REACT_APP_EVENT_NAME;
    const { user } = useAuth();
  
    return (
      <div>
        <br></br>
          <Box paddingLeft={"5%"} paddingRight={"5%"}>
            <Text fontSize={32}>{title} Teams</Text>
            <br></br>
            <Flex flexWrap="wrap" justifyContent="space-evenly">
                {/* temporary team card */}
                {teamData?.map((team: TeamCardType) => <Box width = "300px">
                    <Text fontSize={24}>{team.name}</Text>
                    <Text fontSize={16}>{team.description}</Text>
                </Box>)}
            </Flex>
          </Box>
      </div>
    );
};

export default TeamsDisplay;