import React from "react";
import { Box, Flex, Text, Divider, Tag, useDisclosure, Avatar, TagLabel } from "@chakra-ui/react";
import { UserCardType } from "../../types/UserCard";
import Avatars from "../../definitions/Avatars";
import { commitmentLevelColors } from "../../definitions/CommitmentLevels";

const TeamUserCard: React.FC<UserCardType> = (props: UserCardType) => {
  const { name, profile, email } = props;
  const { description, school, year, skills, commitmentLevel } = profile;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      borderWidth="1px"
      borderStyle="solid"
      rounded="lg"
      boxShadow="lg"
      height="250px"
      width="250px"
      fontWeight="bold"
      alignItems="center"
      backgroundColor="white"
      cursor="pointer"
      padding="3"
      onClick={onOpen}
    >
      <Flex flexDirection="column">
        <Text fontSize="xl" fontWeight="bold" mb="2">
          {name}
        </Text>
        <Tag width="fit-content" alignSelf="right">
          {Avatars[school] && <Avatar src={Avatars[school]} size="xs" />}
          <TagLabel>{school}</TagLabel>
        </Tag>
        <Tag width="fit-content">{year}</Tag>
        <Divider borderColor="gray.300" borderWidth="2px" mb="2" />
        <Flex alignItems="center" flexWrap="wrap" mb="2" height="20px">
          <Tag
            bg={commitmentLevelColors[commitmentLevel]}
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
          {skills.map(skill => (
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
        <Text fontSize="sm" color="gray.500" mb="2" height="45px" isTruncated>
          {description}
        </Text>
        <Divider borderColor="gray.300" borderWidth="2px" />
    
      </Flex>
    </Box>
  );
};

export default TeamUserCard;