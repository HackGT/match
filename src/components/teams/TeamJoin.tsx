import React from "react";
import { Card, Flex, Heading, CardBody, Button, useToast } from "@chakra-ui/react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { getSearchParams } from "../../util/helpers";
import axios from "axios";
import { Service, apiUrl, handleAxiosError } from "@hex-labs/core";

const TeamJoin: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const teamName = getSearchParams(searchParams, "team");
  const hexathon = process.env.REACT_APP_HEXATHON_ID;
  const toast = useToast();
  const navigate = useNavigate();

  const handleAccept = async () => {
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
    navigate("/");
  };

  const handleDecline = async () => {
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
    navigate("/");
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
      padding="20px"
    >
      <CardBody>
        <Heading>Join {teamName}?</Heading>
        <Flex direction="row" align="center" justify="center" padding="20px">
          <Button
            colorScheme="green"
            width="124px"
            height="36px"
            padding="20px"
            onClick={handleAccept}
            borderRadius={"12px"}
          >
            <Link to="/">Accept</Link>
          </Button>
          <Button
            colorScheme="red"
            width="124px"
            height="36px"
            margin="30px"
            onClick={handleDecline}
            borderRadius={"12px"}
          >
            <Link to="/">Decline</Link>
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default TeamJoin;
