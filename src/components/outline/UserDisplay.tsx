import React, { useState, useEffect, useMemo } from "react";
import { Card, Flex, Input, Text, Box, CardBody } from "@chakra-ui/react";
import { GroupBase, OptionBase, Select } from "chakra-react-select";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { UserCardType } from "../../types/UserCard";
import { CommitmentLevels, Schools, Skills } from "../../definitions";
import UserCard from "../UserCard";
import { apiUrl, Service, ErrorScreen, useAuth } from "@hex-labs/core";
import useAxios from "axios-hooks";

interface Props {
    data: any;
}

const UserDisplay: React.FC<Props> = ({data}) => {
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