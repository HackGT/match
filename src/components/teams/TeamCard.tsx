import React from "react";
import { Box, Flex, Text, Divider, Tag, useDisclosure } from "@chakra-ui/react";

import { TeamCardType } from "../../types/TeamCard";
import TeamModal from "./TeamModal";

const TeamCard: React.FC<TeamCardType> = props => {
  const { name, members, description } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {
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
          onClick={onOpen}
        >
          <Flex flexDirection="column">
            <Text fontSize="2xl" fontWeight="bold" mb="1">
              {name}
            </Text>
            <Divider borderColor="gray.300" borderWidth="2px" mb="2" />

            <Flex alignItems="flex-start" flexWrap="wrap" mb="2">
              {members.map((member: any) => (
                <Tag
                  key={member?.userId}
                  bg="blue.400"
                  color="white"
                  borderRadius="md"
                  px="2"
                  py="1"
                  mr="2"
                  mb="2"
                >
                  <Text fontSize="sm">{member ? member.name : ""}</Text>
                </Tag>
              ))}
            </Flex>

            <Box fontSize="sm" color="gray.500" mb="2" maxHeight="80px" overflowY="auto">
              {description}
            </Box>

            <Divider borderColor="gray.300" borderWidth="2px" />

            <Flex justifyContent="flex-start" alignItems="center" mt="2">
              <Tag bg="purple.400" color="white" borderRadius="md" px="2" py="1">
                Members: {members.length}
              </Tag>
            </Flex>
            <TeamModal
              isOpen={isOpen}
              onClose={onClose}
              name={name}
              members={members}
              description={description}
            />
          </Flex>
        </Box>
      }
    </>
  );
};

export default TeamCard;
