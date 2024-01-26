import { Button, Text, Tag, Flex, Divider, useDisclosure, Heading } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from "@chakra-ui/react";

export default function UserGuide(props: any) {
  const { isOpen, onOpen, onClose} = props;

  return (
    <>
      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading>How To Use Match</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading size="md">Managing Your Profile</Heading>

            <Text>1. Click on "Edit Profile" in the navigation bar.</Text>
            <Text>2. Click the checkbox at the bottom of the page to opt-in or opt-out of having your profile displayed in the Match portal to other participants.</Text>
            <Text>3. If choosing to opt-in, you can edit skills, description, and commitment level on this page.</Text>

            <Heading size="md">Requesting to Join a Team</Heading>
            <Text>1. Click on the "Teams" tab.</Text>
            <Text>2. Click on a specific team's card to open a pop-up with more detailed information about its members.</Text>
            <Text>3. If you want to join, click "Ask to Team Up". Members of the team can then accept your request through their team settings box.</Text>

            <Heading size="md">Creating a New Team</Heading>
            <Text>1. In order to request other people to join your team, you must first create a team.</Text>
            <Text>2. Click on the "Teams" tab and create a team through the team settings box at the top.</Text>
            <Text>3. After creating a new team, you can add known members by their emails.</Text>

            <Heading size="md">Requesting a Teammate</Heading>
            <Text>1. Make sure that you have created a new team or are part of a team already.</Text>
            <Text>2. Click on the "Individuals" tab.</Text>
            <Text>3. Find potential teammates by filtering by skills and commitment level.</Text>
            <Text>4. Click on a participant's card to view more detailed profile information.</Text>
            <Text>5. Click "Ask to Team Up" to ask someone to join your team.</Text>
            <Text>6. The participant will receive an email notification with your request and will need to go through the process of requesting to join a team.</Text>
            
            <Heading size="md">Managing a Team</Heading>
            <Text>1. With the team settings box at the top of the "Teams" tab, you can accept member requests, add members, change descriptions, or leave the team.</Text>
            <Text>2. To see and accept member requests, click on the bell at the top right. A ringing bell icon means that your team has pending requests.</Text>
            <Text>3. To leave the team, click on the red arrow at the top right.</Text>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
