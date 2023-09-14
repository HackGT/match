import React from "react";
import { Card, Flex, Heading, Input, Box, CardBody, Button } from "@chakra-ui/react";
import { createSearchParams, useSearchParams, Link } from "react-router-dom";
import { getSearchParams } from "../../util/helpers";
import axios from "axios";
import { Service, apiUrl, handleAxiosError } from "@hex-labs/core";
import useAxios from "axios-hooks";

const TeamJoin: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const teamName = getSearchParams(searchParams, "team");
    const hexathon = getSearchParams(searchParams, "hexathon");

    const handleAccept = async () => {
        try {
            await axios.post(apiUrl(Service.HEXATHONS, `/teams/join`), {
                name: teamName,
                hexathon: hexathon,
                message: ""
              });
            } catch (e: any) {
              handleAxiosError(e);
            }
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
          ><Link to="/">
            Accept
            </Link>
          </Button>
          <Button
          colorScheme="red"
          width="124px"
          height="36px"
          margin="30px"
          borderRadius={"12px"}
        ><Link to="/">
        Decline
        </Link>
        </Button>
        </Flex>
        </CardBody>
    </Card>
  )};

export default TeamJoin;
