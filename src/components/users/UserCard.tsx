import React from "react";
import { Box, Flex, Text, Divider, Tag, useDisclosure, Avatar, TagLabel } from "@chakra-ui/react";
import { UserCardType } from "../../types/UserCard";
import UserModal from "./UserModal";
import Avatars from "../../definitions/Avatars";
import { commitmentLevelColors } from "../../definitions/CommitmentLevels";

const UserCard: React.FC<UserCardType> = (props: UserCardType) => {
  const { name, profile, email } = props;
  const { description, school, year, skills, commitmentLevel } = profile;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      borderWidth="1px"
      borderStyle="solid"
      rounded="lg"
      width="300px"
      alignItems="center"
      backgroundColor="white"
      cursor="pointer"
      p="4"
      onClick={onOpen}
    >
      <Flex flexDirection="column">
        <Text fontSize="2xl" fontWeight="bold" mb="2">
          {name}
        </Text>
        <Tag width="fit-content" alignSelf="right" mb="2">
          {Avatars[school] && <Avatar src={Avatars[school]} size="xs" />}
          <TagLabel>{school}</TagLabel>
        </Tag>
        <Flex gap={2} flexWrap="wrap">
          <Tag width="fit-content" mb="2">
            {year}
          </Tag>
          {commitmentLevel && (
            <Tag
              bg={commitmentLevelColors[commitmentLevel]}
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
          )}
        </Flex>
        <Text fontSize="sm" color="gray.500" overflowY="auto" mb="2">
          {description}
        </Text>

        {skills.length > 0 && (
          <>
            <Divider borderColor="gray.300" mb={2} />
            <Flex alignItems="center" flexWrap="wrap">
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
                  <Text fontSize="xs">{skill}</Text>
                </Tag>
              ))}
            </Flex>
          </>
        )}

        <UserModal
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          name={name}
          profile={profile}
          email={email}
        />
      </Flex>
    </Box>
  );
};

export default UserCard;
