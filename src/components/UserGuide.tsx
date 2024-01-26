import { Button, Heading, Tag, Flex, Divider, useDisclosure } from "@chakra-ui/react";
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
            <Heading size="xl">How To Use Match</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading size="lg" color="#7B69EC">Managing Your Profile</Heading>
            <Heading size = "md">1. Click on "Edit Profile" in the navigation bar.</Heading>
            <Heading size = "md">2. Click the checkbox at the bottom of the page to opt-in or opt-out of having your profile displayed in the Match portal to other participants.</Heading>
            <Heading size = "md">3. If choosing to opt-in, you can edit skills, description, and commitment level on this page.</Heading>
            <br />
            <Heading size="lg" color="#7B69EC">Requesting to Join a Team</Heading>
            <Heading size = "md">1. Click on the "Teams" tab.</Heading>
            <Heading size = "md">2. Click on a specific team's card to open a pop-up with more detailed information about its members.</Heading>
            <Heading size = "md">3. If you want to join, click "Ask to Team Up". Members of the team can then accept your request through their team settings box.</Heading>
            <br />
            <Heading size="lg" color="#7B69EC">Creating a New Team</Heading>
            <Heading size = "md">1. In order to request other people to join your team, you must first create a team.</Heading>
            <Heading size = "md">2. Click on the "Teams" tab and create a team through the team settings box at the top.</Heading>
            <Heading size = "md">3. After creating a new team, you can add known members by their emails.</Heading>
            <br />
            <Heading size="lg" color="#7B69EC">Requesting a Teammate</Heading>
            <Heading size = "md">1. Make sure that you have created a new team or are part of a team already.</Heading>
            <Heading size = "md">2. Click on the "Individuals" tab.</Heading>
            <Heading size = "md">3. Find potential teammates by filtering by skills and commitment level.</Heading>
            <Heading size = "md">4. Click on a participant's card to view more detailed profile information.</Heading>
            <Heading size = "md">5. Click "Ask to Team Up" to ask someone to join your team.</Heading>
            <Heading size = "md">6. The participant will receive an email notification with your request and will need to go through the process of requesting to join a team.</Heading>
            <br />
            <Heading size="lg" color="#7B69EC">Managing a Team</Heading>
            <Heading size = "md">1. With the team settings box at the top of the "Teams" tab, you can accept member requests, add members, change descriptions, or leave the team.</Heading>
            <Heading size = "md">2. To see and accept member requests, click on the bell at the top right. A ringing bell icon means that your team has pending requests.</Heading>
            <Heading size = "md">3. To leave the team, click on the red arrow at the top right.</Heading>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
