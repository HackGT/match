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
} from "@chakra-ui/react";
import Avatars from "../../definitions/Avatars";
import { commitmentLevelColors } from "../../definitions/CommitmentLevels";
import React, { useState } from "react";
import axios from "axios";
import { apiUrl, Service, handleAxiosError, useAuth } from "@hex-labs/core";
import UserCard from "../users/UserCard";
import { UserCardType } from "../../types/UserCard";
export default function TeamModal(props: any) {
  const { isOpen, onClose, name, memberData, description } = props;
  const { user } = useAuth();

  return (
    <>
      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Divider borderColor="gray.300" borderWidth="2px" mb="2" />
            <Text>{description}</Text>
            <Divider borderColor="gray.300" borderWidth="2px" mb="2" />
            <Flex flexWrap="wrap" justifyContent="space-evenly">
              {memberData.map((member: any) => console.log(member.name))}
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button>Ask to Team Up</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
