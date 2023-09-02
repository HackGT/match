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
import { TeamCardType } from "../../types/TeamCard";
import { UserCardType } from "../../types/UserCard";
import { apiUrl, Service } from "@hex-labs/core";
import useAxios from "axios-hooks";

const TeamCard: React.FC<TeamCardType> = (props: TeamCardType) => {
  const { name, members, description } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [{ data, error }] = useAxios({
    method: "GET",
    url: apiUrl(Service.HEXATHONS, `/hexathon-users/${process.env.REACT_APP_HEXATHON_ID}/users/`),
    params: {
        members, 
    },
  });

  console.log(data)

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
      onClick={onOpen} // Open the modal when clicked
    >
      <Flex flexDirection="column">
        <Text fontSize="3xl" fontWeight="bold" mb="1">
          {name}
        </Text>
        <Divider borderColor="gray.300" borderWidth="2px" mb="2" />

        <Flex alignItems="flex-start" flexWrap="wrap" mb="2">
          {data.map((member: any) => (
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
              <Text fontSize="sm">{member?.name}</Text>
            </Tag>
          ))}
        </Flex>

        <Box
          fontSize="sm"
          color="gray.500"
          mb="2"
          maxHeight="80px" 
          overflowY="auto" 
        >
          {description}
        </Box>

        <Divider borderColor="gray.300" borderWidth="2px" />

        <Flex justifyContent="flex-start" alignItems="center" mt="2">
          <Tag bg="purple.400" color="white" borderRadius="md" px="2" py="1">
            Members: {members.length}
          </Tag>
        </Flex>
      </Flex>
    </Box>
  );
};

export default TeamCard;
