import React from "react";
import { apiUrl, Service } from "@hex-labs/core";
import axios from "axios";
import {
  Box,
  Flex,
  HStack,
  Text,
} from "@chakra-ui/react";

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
      rounded="lg"
      boxShadow="lg"
      height="175px"
      fontWeight="bold"
      alignItems="center"
    >
      <Flex padding="2" flexDirection="column">
        <HStack align="flex-end" justify="space-between">
          <Text fontSize="xl">{name}</Text>
          <Text fontSize="sm">{`${college}, ${year}`}</Text>
        </HStack>
        <Text fontSize="sm" fontWeight="semibold" mt="2">
          {description}
        </Text>
        <Text fontSize="sm" mt="2">
          <strong>Skills:</strong> {skills.join(", ")}
        </Text>
        <Text fontSize="sm" mt="2">
          <strong>Commitment Level:</strong> {commitmentLevel}
        </Text>
      </Flex>
    </Box>
  );
};

export default Card;


// import {
//     Box,
//     Flex,
//     HStack,
//     Text,
//     Modal,
//     ModalOverlay,
//     ModalContent,
//     ModalHeader,
//     ModalBody,
//     ModalCloseButton,
//     Link,
//     Button,
//   } from "@chakra-ui/react";
// import { apiUrl, Service } from "@hex-labs/core";
// import axios from "axios";
// import React, { useState } from "react";
// import { unstable_renderSubtreeIntoContainer } from "react-dom";

// type Props = {
//   user: any;
// };


// const ProfileCard: React.FC<Props> = (props: Props) => {
  

//   return (
//     <>
//     <Box
//     borderWidth="1px"
//     rounded="lg"
//     boxShadow="lg"
//     height="175px"
//     fontWeight="bold"
//     alignItems="center"
//     >
//       <Flex padding="2" flexDirection="column">
//         <HStack align="flex-end" justify="space-between">
//           <Text fontSize='xl'>{`${props.user.name.first} ${props.user.name.last}`}</Text>
//         </HStack>
//         <Text
//           fontSize="sm"
//           fontWeight="semibold"
//           justifyContent="justify"
//           mt="2"
//         >
//           {props.user.email}
//         </Text>
//       </Flex>
//     </Box>
//     </>
//   );
// };

  
//   export default ProfileCard;