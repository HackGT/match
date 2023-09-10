import * as React from "react";
import { Box, Button, Center, Flex, Link, Text } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

const NotRegisteredErrorScreen: React.FC = () => {
  return (
    <Box p="5" borderWidth="1px">
      <Center>
        <Flex align="baseline" mt={5}>
          <WarningIcon w={375} h={175} />
        </Flex>
      </Center>
      <Box>
        <Center>
          <Text mt={10} fontSize="xl" fontWeight="semibold" lineHeight="short" noOfLines={2}>
            You are not registered for this event. Please register{" "}
            <Link href="https://registration.hexlabs.org/" isExternal color="blue">
              here
            </Link>{" "}
            before accessing this portal.
          </Text>
        </Center>
      </Box>
      <Center>
        <Flex mt="35px" align="center">
          <Button colorScheme="blue" onClick={() => (window.location.href = "/")}>
            Go Home
          </Button>
        </Flex>
      </Center>
    </Box>
  );
};
export default NotRegisteredErrorScreen;
