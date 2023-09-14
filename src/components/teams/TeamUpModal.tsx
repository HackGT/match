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
import Avatars from "../../definitions/Avatars";
import { commitmentLevelColors } from "../../definitions/CommitmentLevels";
import React, { useState } from "react";
import axios from "axios";
import useAxios from "axios-hooks";
import { apiUrl, Service, handleAxiosError, useAuth } from "@hex-labs/core";

export default function TeamUpModal(props: any) {
  const { isOpen, onOpen, onClose, name, profile, email } = props;
  const { description, school, year, skills, commitmentLevel } = profile;
  const [emailText, setEmailText] = useState("");
  const { user } = useAuth();

  const [{ data: userTeamData, error }, refetch] = useAxios({
    method: "GET",
    url: apiUrl(Service.HEXATHONS, `/teams`),
    params: {
      hexathon: process.env.REACT_APP_HEXATHON_ID,
      userId: user?.uid,
    },
  });

  const teamName = userTeamData?.teams[0].name;
  const hexathon = userTeamData?.teams[0].hexathon;

  const handleUserMessage = (e: { target: { value: React.SetStateAction<string> } }) => {
    setEmailText(e.target.value);
  };

  const onSubmit = async (values: any) => {
    try {
      const myUserID = user?.uid;
      const userDetails = await axios.get(apiUrl(Service.USERS, `/users/${myUserID}`));

    const emailMessage = `
    <html>
      <body>
        <br>
        <p>${emailText}</p>
        <button><a href="match.hexlabs.org/jointeam?team=${teamName}&hexathon=${hexathon}">Join Team</a></button>
        <br>
        <p>For more information, visit Hexlabs Match.</p>
      </body>
    </html>`;

      await axios.post(apiUrl(Service.NOTIFICATIONS, `/email/send`), {
        message: emailMessage,
        // emails: [email],
        emails: ["amytang325@gmail.com"],
        subject:
          userDetails.data.name.first +
          " " +
          userDetails.data.name.middle +
          " " +
          userDetails.data.name.last +
          " invites you to team up for " +
          process.env.REACT_APP_EVENT_NAME +
          "!!",
        hexathon: process.env.REACT_APP_HEXATHON_ID,
      });
    } catch (e: any) {
      handleAxiosError(e);
    }
    onClose();
  };

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
