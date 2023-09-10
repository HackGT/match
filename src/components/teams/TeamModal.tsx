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
  Box
} from "@chakra-ui/react";
import { useAuth } from "@hex-labs/core";
import UserCard from "../users/UserCard";
import { UserCardType } from "../../types/UserCard";
export default function TeamModal(props: any) {
  const { isOpen, onClose, name, memberData, description } = props;
  const { user } = useAuth();

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
                {memberData
                    .filter((hUser: any) => hUser.userId !== user?.uid)
                    .map((user: UserCardType) => <UserCard key={user.name} {...user} />)}
                </Flex>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button backgroundColor="#7B69EC" color="white" width={"100%"}>Ask to Team Up</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
