import UserModal from "./UserModal";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  Flex,
  Text,
  Tag,
  Avatar,
  TagLabel,
  Grid,
  Textarea,
  Divider,
} from "@chakra-ui/react";
import Avatars from "../definitions/Avatars";
import { commitmentLevelColors } from "../definitions/CommitmentLevels";
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { ErrorScreen, LoadingScreen, apiUrl, Service, handleAxiosError } from "@hex-labs/core";

export default function Teamup(props: any) {
  const { isOpen, onOpen, onClose, name, profile } = props;
  const { description, school, year, skills, commitmentLevel } = profile;
  const [emailText, setEmailText] = useState("");

  const handleUserMessage = (e: { target: { value: React.SetStateAction<string>; }; }) =>{
    setEmailText(e.target.value);
  }

  const onSubmit = async (values : any) => {
    try{
        await axios.post(
            apiUrl(Service.NOTIFICATIONS, `/email/send`),
            {
                "message": emailText,
                "emails": ["reese.wang@hexlabs.org"],
                "subject": "Invite to Team Up",
                "hexathon": process.env.REACT_APP_HEXATHON_ID
            }
        )
    } catch(e: any){
        handleAxiosError(e);
    }
    onClose();
  }


  return (
    <>
      <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="3xl" fontWeight="bold" mb="2" textAlign={"center"}>
            Team Up?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid
              templateColumns="1fr 1fr"
              gap={4}
              alignContent="flex-start"
              alignItems={"flex-start"}
            >
              <Card p="4" height={300} boxShadow="md">
                <Text fontSize="2xl" fontWeight="bold" mb="2">
                  {name}
                </Text>
                <Tag width="fit-content" alignSelf="right">
                  {Avatars[school] && <Avatar src={Avatars[school]} size="xs" />}
                  <TagLabel>{school}</TagLabel>
                </Tag>
                <Flex flexDirection="column">
                  <Tag width="fit-content">{year}</Tag>
                  <Divider borderColor="gray.300" borderWidth="2px" mb="2" />
                  <Flex alignItems="center" flexWrap="wrap" mb="2" height="60px">
                    <Tag
                      bg={commitmentLevelColors[commitmentLevel]}
                      color="white"
                      borderRadius="md"
                      px="2"
                      py="1"
                      mr="2"
                      mb="2"
                    >
                      <Text fontSize="sm">
                        <strong>Commitment:</strong> {commitmentLevel}
                      </Text>
                    </Tag>
                    {skills.map((skill: string) => (
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
                  <Text fontSize="sm" color="gray.500" mb="2" height="45px" isTruncated>
                    {description}
                  </Text>
                  <Divider borderColor="gray.300" borderWidth="2px" />
                </Flex>
              </Card>
              <Textarea
                placeholder="Introduce yourself and explain what you want to accomplish at this event!"
                size="md"
                height={300}
                onChange={handleUserMessage}
              ></Textarea>
            </Grid>
          </ModalBody>
          <ModalFooter justifyContent={"flex-end"}>
            <Button onClick={onSubmit}>Submit Message</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
