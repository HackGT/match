import { Button, Text, Tag, Flex, Divider } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export default function UserModal(props: any) {
  const { isOpen, onOpen, onClose, name, profile } = props;
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
              <Tag bg="green.400" color="white" borderRadius="md" px="2" py="1" mr="2" mb="2">
                <Text fontSize="sm">
                  <strong>Commitment:</strong> {profile.commitmentLevel}
                </Text>
              </Tag>
              {profile.skills.map((skill: any) => (
                <Tag
                  key={skill}
                  bg="green.400"
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
            <Button colorScheme="blue">Ask to Team Up</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
