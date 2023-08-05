import React from "react";
import {
  Box,
  Flex,
  Text,
  Divider,
  Tag,
  Button,
  useDisclosure,
  Avatar,
  TagLabel,
} from "@chakra-ui/react";
import { UserCardType } from "../types/UserCard";
import UserModal from "./UserModal";
import Avatars from "../definitions/Avatars";

const UserCard: React.FC<UserCardType> = (props: UserCardType) => {
  const { name, profile } = props;
  const { description, school, year, skills, commitmentLevel } = profile;
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      onClick={onOpen}
    >
      <Flex flexDirection="column">
        <Text fontSize="3xl" fontWeight="bold" mb="2">
          {name}
        </Text>
        <Tag width="fit-content" alignSelf="right">
          {Avatars[school] && <Avatar src={Avatars[school]} size="xs" />}
          <TagLabel>{school}</TagLabel>
        </Tag>
        <Tag width="fit-content">{year}</Tag>
        <Divider borderColor="gray.300" borderWidth="2px" mb="2" />
        <Flex alignItems="center" flexWrap="wrap" mb="2" height="60px">
          <Tag bg="green.400" color="white" borderRadius="md" px="2" py="1" mr="2" mb="2">
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
        <UserModal
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          name={name}
          profile={profile}
        />
      </Flex>
    </Box>
  );
};

export default UserCard;
