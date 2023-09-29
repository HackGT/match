import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Grid,
  Textarea,
  useToast,
  Box,
  Card,
  Text,
  Divider,
  Flex,
  Tag,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { apiUrl, Service, handleAxiosError, useAuth } from "@hex-labs/core";

const TeamUpModal: React.FC<any> = (props: any) => {
  const { isOpen, onClose, name, members, description } = props;
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const toast = useToast();

  const handleUserMessage = (e: { target: { value: React.SetStateAction<string> } }) => {
    setMessage(e.target.value);
  };

  const getMemberEmails = () => {
    const emails: string[] = [];
    members.forEach((member: any) => emails.push(member.email));
    return emails;
  };

  const onSubmit = async (values: any) => {
    try {
      const myUserID = user?.uid;
      const userDetails = await axios.get(apiUrl(Service.USERS, `/users/${myUserID}`));

      await axios.post(apiUrl(Service.HEXATHONS, `/teams/join`), {
        name,
        hexathon: process.env.REACT_APP_HEXATHON_ID,
        email: user?.email,
        message,
      });

      await axios.post(apiUrl(Service.NOTIFICATIONS, `/email/send`), {
        message:
          `<html>
                  <body>
                      <br>
                      <p>` +
          message +
          `</p>
                      <br>
                      <p>To manage this request, visit Hexlabs Match and view your team notifications.</p>
                  </body>
                  </html>`,
        emails: getMemberEmails(),
        subject:
          userDetails.data.name.first +
          " " +
          userDetails.data.name.middle +
          " " +
          userDetails.data.name.last +
          " has requested to join your team for " +
          process.env.REACT_APP_EVENT_NAME +
          "!!",
        hexathon: process.env.REACT_APP_HEXATHON_ID,
      });
      toast({
        title: "Success",
        description: "Your request has been sent.",
        status: "success",
        duration: 3000,
        isClosable: true,
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
              templateColumns={{ base: "1fr", md: "1fr 1fr" }}
              gap="4"
              alignContent="flex-start"
              alignItems={"flex-start"}
            >
              <Card p="4" height={300} boxShadow="md">
                <Text fontSize="2xl" fontWeight="bold" mb="1">
                  {name}
                </Text>
                <Divider borderColor="gray.300" borderWidth="2px" mb="2" />

                <Flex alignItems="flex-start" flexWrap="wrap" mb="2">
                  {members.map((member: any) => (
                    <Tag
                      key={member?.userId}
                      bg="blue.400"
                      color="white"
                      borderRadius="md"
                      px="2"
                      py="1"
                      mr="2"
                      mb="2"
                    >
                      <Text fontSize="sm">{member ? member.name : ""}</Text>
                    </Tag>
                  ))}
                </Flex>

                <Box fontSize="sm" color="gray.500" mb="2" maxHeight="80px" overflowY="auto">
                  {description}
                </Box>

                <Divider borderColor="gray.300" borderWidth="2px" />

                <Flex justifyContent="flex-start" alignItems="center" mt="2">
                  <Tag bg="purple.400" color="white" borderRadius="md" px="2" py="1">
                    Members: {members.length}
                  </Tag>
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
};

export default TeamUpModal;
