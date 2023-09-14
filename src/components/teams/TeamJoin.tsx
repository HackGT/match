import React, { useState, useEffect, useMemo } from "react";
import { Card, Flex, Heading, Input, Box, CardBody, Button, useBreakpointValue } from "@chakra-ui/react";
import { GroupBase, OptionBase, Select } from "chakra-react-select";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { CommitmentLevels, Schools, Skills } from "../../definitions";
import UsersDisplay from "../users/UsersDisplay";
import TeamsDisplay from "../teams/TeamsDisplay";
import { getSearchParams } from "../../util/helpers";

const TeamJoin: React.FC = () => {
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
                Join this team?
        </Heading>
        <Flex direction="row" align="center" justify="center" padding="20px">
          <Button
            colorScheme="green"
            width="124px"
            height="36px"
            padding="20px"
            // onClick=
            borderRadius={"12px"}
          >
            Accept
          </Button>
          <Button
          colorScheme="red"
          width="124px"
          height="36px"
          margin="30px"
          // onClick=
          borderRadius={"12px"}
        >
          Decline
        </Button>
        </Flex>
        </CardBody>
    </Card>
  )};

export default TeamJoin;
