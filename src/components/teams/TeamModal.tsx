import {
    Modal, ModalContent, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, Text
  } from "@chakra-ui/react";
  import Avatars from "../../definitions/Avatars";
  import { commitmentLevelColors } from "../../definitions/CommitmentLevels";
  import React, { useState } from "react";
  import axios from "axios";
  import { apiUrl, Service, handleAxiosError, useAuth } from "@hex-labs/core";
export default function TeamModal(props: any){
    const { isOpen, onOpen, onClose, data} = props;
    return(
        <>
            <Modal size="xl" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize="3xl" fontWeight="bold" mb="2" textAlign={"center"}>
                        Team
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text> AHH</Text>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}