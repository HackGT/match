import React, { useState, useEffect, useMemo } from "react";
import { Card, Flex, Input, Text, Box, CardBody } from "@chakra-ui/react";
import { GroupBase, OptionBase, Select } from "chakra-react-select";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { UserCardType } from "../../types/UserCard";
import { CommitmentLevels, Schools, Skills } from "../../definitions";
import UserCard from "../UserCard";
import { apiUrl, Service, ErrorScreen, useAuth } from "@hex-labs/core";
import useAxios from "axios-hooks";

const Display: React.FC = () => {
  const title = process.env.REACT_APP_EVENT_NAME;
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState("");
  const [commitmentSelectValue, setCommitmentSelectValue] = useState<GroupOption[]>([]);
  const [skillSelectValue, setSkillSelectValue] = useState<GroupOption[]>([]);
  const [schoolSelectValue, setSchoolSelectValue] = useState<GroupOption[]>([]);

  const [{ data, error }] = useAxios({
    method: "GET",
    url: apiUrl(Service.HEXATHONS, `/hexathon-users/${process.env.REACT_APP_HEXATHON_ID}/users`),
    params: {
      matched: true,
      skills: searchParams.get("skill")?.split(","),
      commitmentLevel: searchParams.get("commitment")?.split(","),
      school: searchParams.get("school")?.split(","),
      search: searchText,
    },
  });

  const skillOptions = useMemo(() => Skills, [data]);
  const commitmentOptions = useMemo(() => CommitmentLevels, [data]);
  const schoolOptions = useMemo(() => Schools, [data]);

  useEffect(() => {
    setCommitmentSelectValue(
      commitmentOptions.filter(
        commitment => searchParams.get("commitment")?.includes(commitment.value)
      )
    );
    setSkillSelectValue(
      skillOptions.filter(skill => searchParams.get("skill")?.includes(skill.value))
    );
    setSchoolSelectValue(
      schoolOptions.filter(school => searchParams.get("school")?.includes(school.value))
    );
  }, [searchParams, commitmentOptions, skillOptions, schoolOptions]);

  if (error) return <ErrorScreen error={error} />;

  interface GroupOption extends OptionBase {
    label: string;
    value: string;
  }

  return (
    <Card
      width={"96%"}
      height={"auto"}
      top={"50px"}
      left={"2%"}
      boxShadow={"0px 4px 8px 0px rgba(33, 36, 41, 0.1)"}
    >
      <CardBody>
        <Flex>
          <Input
            placeholder="Search"
            onChange={event => setSearchText(event.target.value)}
            width={"256px"}
            height={"40px"}
          />

          <Box pl="10px" w="256px">
            <Select<GroupOption, true, GroupBase<GroupOption>>
              isMulti
              options={skillOptions}
              placeholder="Skills"
              value={skillSelectValue}
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
                    ? newParams.set("skill", skills.map(skill => skill.value).join())
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
                        commitments.map(commitment => commitment.value).join()
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
              value={schoolSelectValue}
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
                    ? newParams.set("school", schools.map(school => school.value).join())
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
          <Flex flexWrap="wrap" justifyContent="space-evenly">
            {data?.hexathonUsers
              .filter((hUser: any) => hUser.userId !== user?.uid)
              .map((user: UserCardType) => <UserCard key={user.name} {...user} />)}
          </Flex>
        </Box>
      </CardBody>
    </Card>
  );
};

export default Display;
