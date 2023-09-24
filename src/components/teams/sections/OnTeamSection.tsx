import React, { useRef, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  VStack,
  Wrap,
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
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
} from "@chakra-ui/react";
import axios from "axios";
import { apiUrl, handleAxiosError, Service, useAuth } from "@hex-labs/core";
import { IoMdExit } from "react-icons/io";
import { MdOutlineNotificationsActive, MdOutlineNotificationsNone } from "react-icons/md";
import { AiOutlineMessage } from "react-icons/ai";
import UserCard from "../../users/UserCard";

interface Props {
  team: any;
  members: any;
}

const OnTeamSection: React.FC<Props> = props => {
  const hexathon = process.env.REACT_APP_HEXATHON_ID;
  const { id, name, description, memberRequests } = props.team;
  const [email, setEmail] = useState("");
  const [teamDescription, setTeamDescription] = useState(description);
  const {
    isOpen: isLeaveAlertOpen,
    onOpen: onLeaveAlertOpen,
    onClose: onLeaveAlertClose,
  } = useDisclosure();

  const {
    isOpen: isNotificationsOpen,
    onOpen: onNotificationsOpen,
    onClose: onNotificationsClose,
  } = useDisclosure();

  const cancelRef = useRef<HTMLButtonElement>(null);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { user } = useAuth();
  const userEmail = user?.email;

  const changeEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const handleAddMember = async () => {
    try {
      await axios.post(apiUrl(Service.HEXATHONS, "/teams/add"), {
        hexathon,
        email: userEmail,
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
        hexathon,
        description: teamDescription,
      });
      window.location.reload();
    } catch (err: any) {
      handleAxiosError(err);
    }
  };

  const handleAcceptUser = async (userId: string) => {
    try {
      await axios.post(apiUrl(Service.HEXATHONS, `/teams/${id}/accept-user`), {
        hexathon,
        email: userEmail,
      });
      window.location.reload();
    } catch (err: any) {
      handleAxiosError(err);
    }
  };

  const handleRejectUser = async (userId: string) => {
    try {
      await axios.post(apiUrl(Service.HEXATHONS, `/teams/${id}/reject-user`), {
        hexathon,
        email: userEmail,
      });
      window.location.reload();
    } catch (err: any) {
      handleAxiosError(err);
    }
  };

  return (
    <Box
      width={{ base: "80vw", md: "60vw" }}
      marginTop="40px"
      borderRadius="2px"
      boxShadow={{
        base: "rgba(0, 0, 0, 0.15) 0px 0px 6px 1px",
      }}
      paddingBottom="30px"
      position="relative"
    >
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
          top: 10,
          right: 10,
          backgroundColor: "#db2a3e",
          borderRadius: "20%",
          height: 30,
          width: 30,
          cursor: "pointer",
        }}
        onClick={onLeaveAlertOpen}
      />
      <AlertDialog
        isOpen={isLeaveAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onLeaveAlertClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Leave the team
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? This action will remove yourself from the team.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onLeaveAlertClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleRemoveSelf} ml={3}>
                Leave
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      {memberRequests.length > 0 ? (
        <MdOutlineNotificationsActive
          style={{
            position: "absolute",
            top: 50,
            right: 10,
            borderColor: "#db2a3e",
            height: 30,
            width: 30,
            cursor: "pointer",
          }}
          onClick={onNotificationsOpen}
        />
      ) : (
        <MdOutlineNotificationsNone
          style={{
            position: "absolute",
            top: 50,
            right: 10,
            borderColor: "#db2a3e",
            height: 30,
            width: 30,
            cursor: "pointer",
          }}
          onClick={onNotificationsOpen}
        />
      )}
      <Drawer
        isOpen={isNotificationsOpen}
        placement="right"
        onClose={onNotificationsClose}
        finalFocusRef={cancelRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Team Notifications</DrawerHeader>
          <DrawerBody>
            {memberRequests.length == 0 ? (
              <Text>No notifications</Text>
            ) : (
              <VStack align="left">
                <Text as="b" fontSize="18px" fontWeight="bold" color="#7B69EC">
                  Members Requests
                </Text>
                {memberRequests.map(
                  (member: any) =>
                    member && (
                      <VStack mt={2}>
                        <UserCard {...member} />
                        <HStack>
                          <AiOutlineMessage />
                          <Text fontSize="14px" color="black">
                            {member.message}
                          </Text>
                        </HStack>
                        <HStack mt={2} justify="space-evenly">
                          <Button
                            backgroundColor="#4CAF50"
                            size="sm"
                            onClick={() => handleAcceptUser(member.userId)}
                          >
                            <Text fontSize="14px" color="black">
                              Accept
                            </Text>
                          </Button>
                          <Button
                            backgroundColor="#F44336"
                            size="sm"
                            onClick={() => handleRejectUser(member.userId)}
                          >
                            <Text fontSize="14px" color="black">
                              Reject
                            </Text>
                          </Button>
                        </HStack>
                      </VStack>
                    )
                )}
              </VStack>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Flex flexDirection={isMobile ? "column" : "row"} justify="space-evenly">
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
            <Text textAlign="center" fontSize={15}>
              {member.name} - {member.email}
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
          />
          <Flex alignItems="start">
            <Text fontSize="xs" color="#858585">
              {`(${teamDescription.length}/200) characters`}
            </Text>
          </Flex>
        </VStack>
      </Flex>
      <Center>
        <Button marginTop="20px" onClick={handleUpdateTeam}>
          Update team
        </Button>
      </Center>
    </Box>
  );
};

export default OnTeamSection;
