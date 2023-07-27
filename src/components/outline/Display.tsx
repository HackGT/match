import React, { useState, useEffect, useMemo } from "react";
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
import { createSearchParams, useSearchParams } from "react-router-dom";
import { UserCardType, UserListType } from "../../types/UserCard";
import { CommitmentLevels, Schools, Skills } from "../../definitions";
import UserCard from "../UserCard";
import { User } from "firebase/auth";

const Display: React.FC<UserListType> = ({ users }: any) => {
  const title = process.env.REACT_APP_EVENT_NAME;
  const [searchParams, setSearchParams] = useSearchParams();
  const [commitmentSelectValue, setCommitmentSelectValue] = useState<
    GroupOption[]
  >([]);
  const [skillSelectValue, setSkillSelectValue] = useState<GroupOption[]>([]);
  const [schoolSelectValue, setSchoolSelectValue] = useState<GroupOption[]>([]);

  const skillOptions = useMemo(() => Skills, []);
  const commitmentOptions = useMemo(() => CommitmentLevels, []);
  const schoolOptions = useMemo(() => Schools, []);

  useEffect(() => {
    setCommitmentSelectValue(
      commitmentOptions.filter((commitment) =>
        searchParams.get("commitment")?.includes(commitment.value)
      )
    );
    setSkillSelectValue(
      skillOptions.filter((skill) =>
        searchParams.get("skill")?.includes(skill.value)
      )
    );
    setSchoolSelectValue(
      schoolOptions.filter((school) =>
        searchParams.get("school")?.includes(school.value)
      )
    );
  }, [searchParams, commitmentOptions, skillOptions, schoolOptions]);

  const filteredProfiles = users.filter((user: UserCardType) => {
    if (
      commitmentSelectValue.length > 0 &&
      !commitmentSelectValue.find(
        (option) => option.value === user.profile.commitmentLevel
      )
    ) {
      return false;
    }

    if (
      skillSelectValue.length > 0 &&
      !user.profile.skills.some((skill) =>
        skillSelectValue.some((option) => option.value === skill)
      )
    ) {
      return false;
    }

    if (
      schoolSelectValue.length > 0 &&
      !schoolSelectValue.find((option) => option.value === user.profile.school)
    ) {
      return false;
    }

    return true;
  });

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
              onChange={(e: any) => {
                const skills: GroupOption[] = [];
                if (e !== null) {
                  e.forEach((val: any) => {
                    skills.push({
                      label: val.label,
                      value: val.value,
                    });
                  });

                  const newParams = createSearchParams(searchParams);

                  skills.length > 0
                    ? newParams.set(
                        "skill",
                        skills.map((skill) => skill.value).join()
                      )
                    : newParams.delete("skill");

                  setSearchParams(newParams);
                }
              }}
            />
          </Box>

          <Box pl="10px" w="256px">
            <Select<GroupOption, true, GroupBase<GroupOption>>
              isMulti
              options={commitmentOptions}
              placeholder="Commitment Level"
              value={commitmentSelectValue}
              closeMenuOnSelect={false}
              selectedOptionStyle="check"
              hideSelectedOptions={false}
              useBasicStyles
              onChange={(e: any) => {
                const commitments: GroupOption[] = [];
                if (e !== null) {
                  e.forEach((val: any) => {
                    commitments.push({
                      label: val.label,
                      value: val.value,
                    });
                  });

                  const newParams = createSearchParams(searchParams);

                  commitments.length > 0
                    ? newParams.set(
                        "commitment",
                        commitments.map((commitment) => commitment.value).join()
                      )
                    : newParams.delete("commitment");

                  setSearchParams(newParams);
                }
              }}
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
              onChange={(e: any) => {
                const schools: GroupOption[] = [];
                if (e !== null) {
                  e.forEach((val: any) => {
                    schools.push({
                      label: val.label,
                      value: val.value,
                    });
                  });

                  const newParams = createSearchParams(searchParams);

                  schools.length > 0
                    ? newParams.set(
                        "school",
                        schools.map((school) => school.value).join()
                      )
                    : newParams.delete("school");

                  setSearchParams(newParams);
                }
              }}
            />
          </Box>
        </Flex>
        <br></br>
        <Box paddingLeft={"5%"} paddingRight={"5%"}>
          <Text fontSize={32}>{title}</Text>
          <br></br>
          <SimpleGrid columns={4} spacing={"50px"}>
            {filteredProfiles.map((user: UserCardType) => (
              <UserCard {...user} />
            ))}
          </SimpleGrid>
        </Box>
      </CardBody>
    </Card>
  );
};

export default Display;
