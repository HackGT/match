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
} from "@chakra-ui/react";

const UserDrawer = (props : any) => {
    const { isOpen, onOpen, onClose, teamRequests } = props;
    const cancelRef = useRef<HTMLButtonElement>(null);

    console.log(teamRequests)

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
            {/* {memberRequests.length == 0 ? (
              <Text>No notifications</Text>
            ) : (
              <VStack align="left">
                <Text as="b" fontSize="18px" fontWeight="bold" color="#7B69EC">
                  Members Requests
                </Text>
                {memberRequests.map((memberRequest: any) => (
                  <VStack mt={2}>
                    <UserCard {...memberRequest.member} />
                    <HStack>
                      <AiOutlineMessage />
                      <Text fontSize="14px" color="black">
                        {memberRequest.message}
                      </Text>
                    </HStack>
                    <HStack mt={2} justify="space-evenly">
                      <Button
                        backgroundColor="#4CAF50"
                        size="sm"
                        onClick={() => handleAcceptUser(memberRequest.member.email)}
                      >
                        <Text fontSize="14px" color="black">
                          Accept
                        </Text>
                      </Button>
                      <Button
                        backgroundColor="#F44336"
                        size="sm"
                        onClick={() => handleRejectUser(memberRequest.member.email)}
                      >
                        <Text fontSize="14px" color="black">
                          Reject
                        </Text>
                      </Button>
                    </HStack>
                  </VStack>
                ))}
              </VStack>
            )} */}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default UserDrawer