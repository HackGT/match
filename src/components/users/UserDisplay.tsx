import React from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import { UserCardType } from "../../types/UserCard";
import UserCard from "./UserCard";
import { useAuth } from "@hex-labs/core";

interface Props {
  data: any;
}

const UserDisplay: React.FC<Props> = ({ data }) => {
  const title = process.env.REACT_APP_EVENT_NAME;
  const { user } = useAuth();

  return (
    <div>
      <br></br>
      <Box paddingLeft={"5%"} paddingRight={"5%"}>
        <Text fontSize={32}>{title}</Text>
        <br></br>
        <Flex flexWrap="wrap" justifyContent="space-evenly">
          {data?.hexathonUsers
            .filter((hUser: any) => hUser.userId !== user?.uid)
            .map((user: UserCardType) => <UserCard key={user.name} {...user} />)}
        </Flex>
      </Box>
    </div>
  );
};

export default UserDisplay;
