import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Divider,
  ModalFooter,
  Button,
  Flex,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import UserCard from "../users/UserCard";
import { UserCardType } from "../../types/UserCard";
import TeamUpModal from "./TeamUpModal";

const TeamModal: React.FC<any> = (props: any) => {
  const { isOpen, onClose, name, members, description } = props;
  const { isOpen: isTeamUpOpen, onOpen: onTeamUpOpen, onClose: onTeamUpClose } = useDisclosure();

  const teamUp = () => {
    onTeamUpOpen();
    onClose();
  };

  return (
    <>
      <Modal size="6xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Divider borderColor="gray.300" borderWidth="2px" mb="2" />
            <Text>{description}</Text>
            <Divider borderColor="gray.300" borderWidth="2px" mb="2" />
            <Box>
              <Flex flexWrap="wrap" justifyContent="space-evenly">
                {members.map((member: UserCardType) => (
                  <UserCard key={member.name} {...member} />
                ))}
              </Flex>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              backgroundColor="#7B69EC"
              color="white"
              width={"100%"}
              onClick={teamUp}
              isDisabled={members.length === 4}
            >
              Ask to Team Up
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <TeamUpModal
        isOpen={isTeamUpOpen}
        onOpen={onTeamUpOpen}
        onClose={onTeamUpClose}
        name={name}
        members={members}
        description={description}
      />
    </>
  );
};

export default TeamModal;
