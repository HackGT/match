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
    const { name, members, description } = props;

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
            <Flex flexDirection="column">
                <Text fontSize="3xl" fontWeight="bold" mb="2">
                    {name}
                </Text>
                <Divider borderColor="gray.300" borderWidth="2px" mb="2" />
                <Text fontSize="sm" color="gray.500" mb="2" height="45px" isTruncated>
                    {description}
                </Text>
                <Divider borderColor="gray.300" borderWidth="2px" />
            </Flex>
        </Box>
      );
};

export default TeamCard;