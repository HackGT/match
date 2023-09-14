import React, { useState, useEffect, useMemo } from "react";
import { Card, Flex, Heading, Input, Box, CardBody, Button, useBreakpointValue } from "@chakra-ui/react";
import { GroupBase, OptionBase, Select } from "chakra-react-select";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { CommitmentLevels, Schools, Skills } from "../../definitions";
import UsersDisplay from "../users/UsersDisplay";
import TeamsDisplay from "../teams/TeamsDisplay";
import { getSearchParams } from "../../util/helpers";

const TeamJoin: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const teamName = getSearchParams(searchParams, "team");
    const hexathon = getSearchParams(searchParams, "hexathon");

    // console.log('search params', searchParams);
    // console.log('team name', teamName);
    // console.log('hexathon', hexathon);

    const handleAccept = () => {
        console.log('accepted');
    };

    const handleDecline = () => {
        console.log('declined');
    };

  return (
    <Card
    width={"40%"}
      height={"auto"}
      top={"50px"}
      left={"30%"}
      boxShadow={"0px 4px 8px 0px rgba(33, 36, 41, 0.1)"}
      align="center"
      justify="center"
      padding="20px">
        <CardBody>
        <Heading>
                Join {teamName}?
        </Heading>
        <Flex direction="row" align="center" justify="center" padding="20px">
          <Button
            colorScheme="green"
            width="124px"
            height="36px"
            padding="20px"
            onClick={handleAccept}
            borderRadius={"12px"}
          >
            Accept
          </Button>
          <Button
          colorScheme="red"
          width="124px"
          height="36px"
          margin="30px"
          onClick={handleDecline}
          borderRadius={"12px"}
        >
          Decline
        </Button>
        </Flex>
        </CardBody>
    </Card>
  )};

export default TeamJoin;
