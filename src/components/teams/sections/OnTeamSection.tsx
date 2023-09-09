import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  VStack,
  Wrap,
  HStack,
  Textarea,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useBreakpointValue,
  Flex,
  Center,
} from "@chakra-ui/react";
import axios from "axios";
import { apiUrl, handleAxiosError, Service } from "@hex-labs/core";
import { IoMdExit } from "react-icons/io";

interface Props {
  team: any;
  members: any;
}

const OnTeamSection: React.FC<Props> = props => {
  const hexathon = process.env.REACT_APP_HEXATHON_ID;
  const { id, name, description } = props.team;
  const [email, setEmail] = useState("");
  const [teamDescription, setTeamDescription] = useState(description);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const changeEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const handleAddMember = async () => {
    try {
      await axios.post(apiUrl(Service.HEXATHONS, "/teams/add"), {
        hexathon,
        email,
      });
      window.location.reload();
    } catch (err: any) {
      handleAxiosError(err);
    }
  };

  const handleRemoveSelf = async () => {
    try {
      await axios.post(apiUrl(Service.HEXATHONS, "/teams/leave"), {
        name,
        hexathon,
      });
      window.location.reload();
    } catch (err: any) {
      handleAxiosError(err);
    }
  };

  const handleUpdateDescription = (e: any) => {
    setTeamDescription(e.target.value);
  };

  const handleUpdateTeam = async () => {
    try {
      await axios.put(apiUrl(Service.HEXATHONS, `/teams/${id}`), {
        description: teamDescription,
      });
      window.location.reload();
    } catch (err: any) {
      handleAxiosError(err);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <Heading
        textAlign="center"
        paddingTop="20px"
        paddingBottom="10px"
        size="lg"
        lineHeight="inherit"
      >
        Your Team: {name}
      </Heading>

      <IoMdExit
        style={{
          position: "absolute",
          top: 30,
          right: isMobile ? -3 : -10,
          backgroundColor: "#db2a3e",
          borderRadius: "20%",
          height: 30,
          width: 30,
          cursor: "pointer",
        }}
        onClick={onOpen}
      />
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Leave the team
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? This action will remove yourself from the team.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleRemoveSelf} ml={3}>
                Leave
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Flex flexDirection={isMobile ? "column" : "row"} gap={isMobile ? 10 : 20}>
        <VStack>
          <Heading
            textAlign="center"
            paddingTop="10px"
            paddingBottom="10px"
            size="sm"
            lineHeight="inherit"
          >
            Current members
          </Heading>
          {props.members.map((member: any) => (
            <Text textAlign="center">
              {member.name.first} {member.name.last} - {member.email}
            </Text>
          ))}
          <Box paddingBottom="30px">
            {props.members.length >= 4 && (
              <Heading paddingY="10px" size="sm" lineHeight="inherit">
                You can have up to 4 members on a team.
              </Heading>
            )}
            {props.members.length < 4 && (
              <VStack>
                <Heading marginTop="20px" textAlign="center" size="sm" lineHeight="inherit">
                  Add more members to your team!
                </Heading>
                <Wrap justify="center" spacing="20px">
                  <Input
                    value={email}
                    width="220px"
                    onChange={changeEmail}
                    placeholder="beardell@hackgt.com"
                  />
                  <Button onClick={handleAddMember}>Add</Button>
                </Wrap>
              </VStack>
            )}
          </Box>
        </VStack>
        <VStack>
          <Heading
            textAlign="center"
            paddingTop="10px"
            paddingBottom="10px"
            size="sm"
            lineHeight="inherit"
          >
            Description
          </Heading>
          <Textarea
            value={teamDescription}
            size="md"
            height={175}
            width={300}
            maxLength={200}
            onChange={handleUpdateDescription}
          ></Textarea>
        </VStack>
      </Flex>
      <Center>
        <Button marginTop="20px" onClick={handleUpdateTeam}>
          Update team
        </Button>
      </Center>
    </div>
  );
};

export default OnTeamSection;
