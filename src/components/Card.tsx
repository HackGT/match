import React from "react";
import { apiUrl, Service } from "@hex-labs/core";
import axios from "axios";
import { Box, Flex, Text, Divider } from "@chakra-ui/react";

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
    >
      <Flex padding="2" flexDirection="column">
        <Text fontSize="3xl" fontWeight="bold">
          {name}
        </Text>
        <Text fontSize="sm" mt="2">
          {`${college}, ${year}`}
        </Text>
        <Divider mt="2" borderColor="gray.300" borderWidth="2px" />
        <Box
          mt="2"
          bg="green.400" // Set background color to green
          color="white" // Set text color to white
          borderRadius="md" // Apply rounded edges
          px="2" // Horizontal padding
          py="1" // Vertical padding
          display="inline-block" // Display as inline-block
        >
          <Text fontSize="sm">
            <strong>Commitment Level:</strong> {commitmentLevel}
          </Text>
        </Box>
        <Text fontSize="sm" mt="2" color="gray.500">
          <strong>Skills:</strong> {skills.join(", ")}
        </Text>
        <Text fontSize="sm" mt="2" color="gray.500">
          <strong>Description:</strong> {description}
        </Text>
        <Divider mt="2" borderColor="gray.300" borderWidth="2px" />
      </Flex>
    </Box>
  );
};

export default Card;
