import React from "react";
import {
  Box,
  Flex,
  Text,
  Divider,
  Tag,
  useDisclosure,
  Avatar,
  TagLabel,
} from "@chakra-ui/react";
import { TeamCardType } from "../types/TeamCard";
import userData from "../definitions/DummyTeamData";
import teamData from "../definitions/DummyTeamData";

const TeamCard: React.FC<TeamCardType> = (props: TeamCardType) => {
    
    return (
        <Box
          borderWidth="1px"
          borderStyle="solid"
          rounded="lg"
          boxShadow="lg"
          height="315px"
          width="300px"
          fontWeight="bold"
          alignItems="center"
          backgroundColor="white"
          cursor="pointer"
          padding="4"
        >
        </Box>
      );
};

export default TeamCard;