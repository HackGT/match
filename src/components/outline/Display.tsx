import React from "react";
import { Input, Button, Menu, Box, SimpleGrid, MenuButton } from "@chakra-ui/react";

const Display: React.FC = () => {
  return (
    <div>
      <div id="filters">
        <Input placeholder="Search" width={250} outlineColor="purple"></Input>
        <Menu>
          <MenuButton width={250} outlineColor={"purple"}>Skills</MenuButton>
        </Menu>
        <Menu>
          <MenuButton width={250} outlineColor={"purple"}>Track</MenuButton>
        </Menu>
        <Menu>
          <MenuButton width={250} outlineColor={"purple"}>Schools</MenuButton>
        </Menu>
      </div>
      <h1>HackGT 9 Team Formation </h1>
      <SimpleGrid columns={4} spacing={5}>
        <Box bg="blue" height="100px"></Box>
        <Box bg="blue" height="100px"></Box>
        <Box bg="blue" height="100px"></Box>
        <Box bg="blue" height="100px"></Box>
        <Box bg="blue" height="100px"></Box>
        <Box bg="blue" height="100px"></Box>
        <Box bg="blue" height="100px"></Box>
        <Box bg="blue" height="100px"></Box>
      </SimpleGrid>
    </div>
  );
};

export default Display;