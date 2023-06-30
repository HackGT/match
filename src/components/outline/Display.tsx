import React from "react";
import { Card, Flex, Input, MenuList, MenuItem, InputGroup, Text, Icon, Button, Menu, Box, SimpleGrid, MenuButton, CardBody, InputRightElement } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const Display: React.FC = () => {
  return (
    <Card width={"96%"} height={"795px"} top={"50px"} left={"2%"} boxShadow={"0px 4px 8px 0px rgba(33, 36, 41, 0.1)"}>
      <CardBody>
        <Flex>
          <Input placeholder="Search" width={"256px"} height={"40px"} borderRadius={"4px"} border={"1px solid rgba(123, 105, 236, 1)"}/>
          <Menu>
            <Box display="flex" alignItems="center">
              <InputGroup padding={"0px 0px 0px 10px"}>
                <Input placeholder="Skills" padding={"0px 0px 0px 10px"} width={"256px"} height={"40px"} borderRadius={"4px"} border={"1px solid rgba(123, 105, 236, 1)"}/>
                  <InputRightElement>
                    <MenuButton height="40px" display="flex" alignItems="center">
                      <ChevronDownIcon />
                    </MenuButton>
                  </InputRightElement>
              </InputGroup>
            </Box>
            <MenuList>
              <MenuItem>Skill 1</MenuItem>
              <MenuItem>Skill 2</MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <Box display="flex" alignItems="center">
              <InputGroup padding={"0px 0px 0px 10px"}>
                <Input placeholder="Track" padding={"0px 0px 0px 10px"} width={"256px"} height={"40px"} borderRadius={"4px"} border={"1px solid rgba(123, 105, 236, 1)"}/>
                  <InputRightElement>
                    <MenuButton height="40px" display="flex" alignItems="center">
                      <ChevronDownIcon />
                    </MenuButton>
                  </InputRightElement>
              </InputGroup>
            </Box>
            <MenuList>
              <MenuItem>Track 1</MenuItem>
              <MenuItem>Track 2</MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <Box display="flex" alignItems="center">
              <InputGroup padding={"0px 0px 0px 10px"}>
                <Input placeholder="Schools" padding={"0px 0px 0px 10px"} width={"256px"} height={"40px"} borderRadius={"4px"} border={"1px solid rgba(123, 105, 236, 1)"}/>
                  <InputRightElement>
                    <MenuButton height="40px" display="flex" alignItems="center">
                      <ChevronDownIcon />
                    </MenuButton>
                  </InputRightElement>
              </InputGroup>
            </Box>
            <MenuList>
              <MenuItem>School 1</MenuItem>
              <MenuItem>School 2</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <br></br>
        <Box paddingLeft={"5%"} paddingRight={"5%"}>
          <Text fontSize={32} fontFamily="Roobert">HackGT 9 Team Formation</Text>
          <br></br>
          <SimpleGrid columns={4} spacing={"50px"}>
            <Box bg="blue" width={"100%"} height="150px"></Box>
            <Box bg="blue" width={"100%"} height="150px"></Box>
            <Box bg="blue" width={"100%"} height="150px"></Box>
            <Box bg="blue" width={"100%"} height="150px"></Box>
            <Box bg="blue" width={"100%"} height="150px"></Box>
            <Box bg="blue" width={"100%"} height="150px"></Box>
          </SimpleGrid>
        </Box>
      </CardBody>
    </Card>
  );
};

export default Display;