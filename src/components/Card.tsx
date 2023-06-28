import React, { useEffect, useState } from "react";
import { apiUrl, Service } from "@hex-labs/core";
import axios from "axios";
import { Box, Flex, Text, Divider, Tag } from "@chakra-ui/react";

type Props = {
  name: string;
  description: string;
  college: string;
  year: string;
  skills: string[];
  commitmentLevel: string;
};

const Card: React.FC<Props> = ({
  name,
  description,
  college,
  year,
  skills,
  commitmentLevel,
}: Props) => {

  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const requestUrl = apiUrl(Service.USERS, "/users");
      const data = await axios.get(requestUrl);
      console.log(data);
      setUsers(data?.data?.profiles);
    };
    getUsers();
  }, []);

  // const fetchData = async () => {
  //   try {
  //     const requestUrl = apiUrl(Service.USERS, "/users");
  //     const response = await axios.get(requestUrl);
  //     const data = response?.data?.profiles;
  //     setUsers(data);
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <Box
      borderWidth="1px"
      borderStyle="solid"
      rounded="lg"
      boxShadow="lg"
      height="400px"
      width="400px"
      fontWeight="bold"
      alignItems="center"
      backgroundColor="white"
      padding="4"
    >
      <Flex flexDirection="column">
        <Text fontSize="3xl" fontWeight="bold" mb="2">
          {name}
        </Text>
        <Text fontSize="sm" mb="2">
          {`${college}, ${year}`}
        </Text>
        <Divider borderColor="gray.300" borderWidth="2px" mb="2" />
        <Flex alignItems="center" flexWrap="wrap" mb="2">
          <Tag
            bg="green.400"
            color="white"
            borderRadius="md"
            px="2"
            py="1"
            mr="2" // Add margin right for spacing
            mb="2" // Add margin bottom for vertical spacing
          >
            <Text fontSize="sm">
              <strong>Commitment:</strong> {commitmentLevel}
            </Text>
          </Tag>
          {skills.map((skill) => (
            <Tag
              key={skill}
              bg="green.400"
              color="white"
              borderRadius="md"
              px="2"
              py="1"
              mr="2" // Add margin right for spacing
              mb="2" // Add margin bottom for vertical spacing
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

export default Card;
