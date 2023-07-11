import React, { useMemo } from "react";
import {
  Card,
  Flex,
  Input,
  Text,
  Box,
  SimpleGrid,
  CardBody,
} from "@chakra-ui/react";
import { GroupBase, OptionBase, Select } from "chakra-react-select";
import { UserCardType, UserListType } from "../../types/UserCard";
import UserCard from "../UserCard";

const Display: React.FC<UserListType> = ({ users }: any) => {
  const title = process.env.REACT_APP_EVENT_NAME;
  // options must match -> https://github.com/HackGT/api/blob/main/common/src/commonDefinitions.ts
  const skillOptions = useMemo(
    () => [
      {
        label: "Skill 1",
        value: "SKILL_1",
      },
      {
        label: "Skill 2",
        value: "SKILL_2",
      },
    ],
    []
  );
  const trackOptions = useMemo(
    () => [
      {
        label: "Track 1",
        value: "TRACK_1",
      },
      {
        label: "Track 2",
        value: "TRACK_2",
      },
    ],
    []
  );
  const schoolOptions = useMemo(
    () => [
      {
        label: "School 1",
        value: "SCHOOL_1",
      },
      {
        label: "School 2",
        value: "SCHOOL_2",
      },
    ],
    []
  );
  interface GroupOption extends OptionBase {
    label: string;
    value: string;
  }

  return (
    <Card
      width={"96%"}
      height={"795px"}
      top={"50px"}
      left={"2%"}
      boxShadow={"0px 4px 8px 0px rgba(33, 36, 41, 0.1)"}
    >
      <CardBody>
        <Flex>
          <Input placeholder="Search" width={"256px"} height={"40px"} />

          <Box pl="10px" w="256px">
            <Select<GroupOption, true, GroupBase<GroupOption>>
              isMulti
              options={skillOptions}
              placeholder="Skills"
              closeMenuOnSelect={false}
              selectedOptionStyle="check"
              hideSelectedOptions={false}
              useBasicStyles
            />
          </Box>

          <Box pl="10px" w="256px">
            <Select<GroupOption, true, GroupBase<GroupOption>>
              isMulti
              options={trackOptions}
              placeholder="Tracks"
              closeMenuOnSelect={false}
              selectedOptionStyle="check"
              hideSelectedOptions={false}
              useBasicStyles
            />
          </Box>

          <Box pl="10px" w="256px">
            <Select<GroupOption, true, GroupBase<GroupOption>>
              isMulti
              options={schoolOptions}
              placeholder="Schools"
              closeMenuOnSelect={false}
              selectedOptionStyle="check"
              hideSelectedOptions={false}
              useBasicStyles
            />
          </Box>
        </Flex>
        <br></br>
        <Box paddingLeft={"5%"} paddingRight={"5%"}>
          <Text fontSize={32}>{title}</Text>
          <br></br>
          <SimpleGrid columns={4} spacing={"50px"}>
            {users.map((user: UserCardType) => (
                <UserCard {...user} />
              ))}
          </SimpleGrid>
        </Box>
      </CardBody>
    </Card>
  );
};

export default Display;
