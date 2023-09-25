import { Button, Text, Tag, Flex, Divider, useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { commitmentLevelColors } from "../../definitions/CommitmentLevels";
import { useAuth, apiUrl, Service, LoadingScreen } from "@hex-labs/core";
import useAxios from "axios-hooks";
import UserTeamUpModal from "./UserTeamUpModal";

export default function UserModal(props: any) {
  const { user } = useAuth();
  const { isOpen, onOpen, onClose, name, profile, email } = props;
  const { isOpen: isTeamUpOpen, onOpen: onTeamUpOpen, onClose: onTeamUpClose } = useDisclosure();
  const toast = useToast();

  const [{ data, loading }] = useAxios({
    url: apiUrl(Service.HEXATHONS, `/teams`),
    method: "GET",
    params: {
      hexathon: process.env.REACT_APP_HEXATHON_ID,
      userId: user?.uid,
    },
  });

  if (loading) return <LoadingScreen />;

  const teamUp = () => {
    // first check if user is part of a team before making a request to team up
    if (Object.keys(data).length === 0) {
      toast({
        title: "Error",
        description: "You must be part of a team to team up with another user.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    onTeamUpOpen();
    onClose();
  };

  return (
    <>
      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="sm" mb="2">
              {`${profile.school}, ${profile.year}`}
            </Text>
            <Divider borderColor="gray.300" borderWidth="2px" mb="2" />
            <Flex alignItems="center" flexWrap="wrap" mb="2">
              <Tag
                bg={commitmentLevelColors[profile.commitmentLevel]}
                color="white"
                borderRadius="md"
                px="2"
                py="1"
                mr="2"
                mb="2"
              >
                <Text fontSize="sm">
                  <strong>Commitment:</strong> {profile.commitmentLevel}
                </Text>
              </Tag>
              {profile.skills.map((skill: any) => (
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
              <strong>Description:</strong> {profile.description}
            </Text>
            <Divider borderColor="gray.300" borderWidth="2px" />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={teamUp}>
              Ask to Team Up
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <UserTeamUpModal
        isOpen={isTeamUpOpen}
        onOpen={onTeamUpOpen}
        onClose={onTeamUpClose}
        name={name}
        profile={profile}
        email={email}
      />
    </>
  );
}
