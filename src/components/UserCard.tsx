import React from "react";
import { Box, Flex, Text, Divider, Tag } from "@chakra-ui/react";
import { UserCardType } from "../types/UserCard";

const UserCard: React.FC<UserCardType> = (props: UserCardType) => {
  const { name, profile } = props;
  const { description, school, year, major, skills, commitmentLevel } = profile;

  return (
    <Box
      borderWidth="1px"
      borderStyle="solid"
      rounded="lg"
      boxShadow="lg"
      height="350px"
      width="350px"
      fontWeight="bold"
      alignItems="center"
      backgroundColor="white"
      padding="4"
      marginBottom="20px"
    >
      <Flex flexDirection="column">
        <Text fontSize="3xl" fontWeight="bold" mb="2">
          {name}
        </Text>
        <Text fontSize="sm" mb="2">
          {school}
        </Text>
        <Text fontSize="sm" mb="2">
          {year}
        </Text>
        <Divider borderColor="gray.300" borderWidth="2px" mb="2" />
        <Flex alignItems="center" flexWrap="wrap" mb="2">
          <Tag
            bg="green.400"
            color="white"
            borderRadius="md"
            px="2"
            py="1"
            mr="2"
            mb="2"
          >
            <Text fontSize="sm">
              <strong>Commitment:</strong> {commitmentLevel}
            </Text>
          </Tag>
          {skills?.map((skill) => (
            <Tag
              key={skill}
              bg="blue.400"
              color="white"
              borderRadius="md"
              px="2"
              py="1"
              mr="2"
              mb="2"
            >
              <Text fontSize="sm">{skill}</Text>
            </Tag>
          ))}
        </Flex>
        <Text fontSize="sm" color="gray.500" mb="2">
          <strong>Description:</strong> {description}
        </Text>
        <Divider borderColor="gray.300" borderWidth="2px" />
      </Flex>
    </Box>
  );
};

export default UserCard;
