import React, { useRef } from "react";
import {
  Text,
  Button,
  VStack,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  useToast,
} from "@chakra-ui/react";
import TeamCard from "../teams/TeamCard";
import { TeamCardType } from "../../types/TeamCard"
import { AiOutlineMessage } from "react-icons/ai";
import axios from "axios";
import { Service, apiUrl, handleAxiosError } from "@hex-labs/core";


const UserDrawer = (props : any) => {
    const { isOpen, onOpen, onClose, teamRequests, user } = props;
    const cancelRef = useRef<HTMLButtonElement>(null);
    const toast = useToast();
    const hexathon = process.env.REACT_APP_HEXATHON_ID;

    var invited = false

    const handleAcceptTeam = async(teamName : String) => {
      try {
        await axios.post(apiUrl(Service.HEXATHONS, `/teams/accept-invite`), {
          name: teamName,
          hexathon,
        });
        toast({
          title: "Success",
          description: `You have joined ${teamName}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (e: any) {
        handleAxiosError(e);
      }
    };

    const handleDeclineTeam = async(teamName : String) => {
      try {
        await axios.post(apiUrl(Service.HEXATHONS, `/teams/reject-invite`), {
          name: teamName,
          hexathon,
        });
        toast({
          title: "Success",
          description: `You have declined the invite to join ${teamName}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (e: any) {
        handleAxiosError(e);
      }
    };
    console.log('user id: ', user.userId)
    // .filter(invite.member.userId === user.userId)

  return (
    <>
        <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={cancelRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Team Notifications</DrawerHeader>
          <DrawerBody>
            {teamRequests.length == 0 ? (
              <Text>No notifications</Text>
            ) : (
              <VStack align="left">
                <Text as="b" fontSize="18px" fontWeight="bold" color="#7B69EC">
                  Team Requests
                </Text>
                {teamRequests.map((teamRequest: TeamCardType) => (
                  <VStack mt={2}>
                    <TeamCard key={teamRequest.name} {...teamRequest} />
                    <HStack>
                      <AiOutlineMessage />
                      {teamRequest?.sentInvites?.map((invite: any) => {
                          if (!invited && user.uid === invite.member.userId) {
                            invited = true
                            return <Text fontSize="14px" color="black">
                              {invite.message}
                            </Text>
                          }   
                      })}
                    </HStack>
                    <HStack mt={2} justify="space-evenly">
                      <Button
                        backgroundColor="#4CAF50"
                        size="sm"
                        onClick={() => handleAcceptTeam(teamRequest.name)}
                      >
                        <Text fontSize="14px" color="black">
                          Accept
                        </Text>
                      </Button>
                      <Button
                        backgroundColor="#F44336"
                        size="sm"
                        onClick={() => handleDeclineTeam(teamRequest.name)}
                      >
                        <Text fontSize="14px" color="black">
                          Reject
                        </Text>
                      </Button>
                    </HStack>
                  </VStack>
                ))}
              </VStack>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default UserDrawer