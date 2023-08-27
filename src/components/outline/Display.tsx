import React, { useState, useEffect, useMemo } from "react";
import { Card, Flex, Input, Text, Box, CardBody, Button } from "@chakra-ui/react";
import { GroupBase, OptionBase, Select } from "chakra-react-select";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { UserCardType } from "../../types/UserCard";
import { CommitmentLevels, Schools, Skills } from "../../definitions";
import UserCard from "../UserCard";
import { apiUrl, Service, ErrorScreen, useAuth } from "@hex-labs/core";
import useAxios from "axios-hooks";
import UserDisplay from "./UserDisplay";
import TeamsDisplay from "./TeamsDisplay";

const Display: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState("");
  const [commitmentSelectValue, setCommitmentSelectValue] = useState<GroupOption[]>([]);
  const [skillSelectValue, setSkillSelectValue] = useState<GroupOption[]>([]);
  const [schoolSelectValue, setSchoolSelectValue] = useState<GroupOption[]>([]);
  const [displayMode, setDisplayMode] = useState("allUsers");

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

  function displayUsers() {
    setDisplayMode("allUsers")
  }

  function displayTeams(){
    setDisplayMode("allTeams")
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
        <Box display="flex" justifyContent="space-between" alignItems="center" borderRadius="12px" borderColor="#7B69EC" width="192px" height="42px" marginLeft={"auto"} marginRight={"auto"} backgroundColor={"#E6E6E6B2"}>
        <Button color={displayMode=="allUsers" ? "#ffffff" : "#7B69EC"} backgroundColor={displayMode=="allUsers" ? "#7B69EC": "#E6E6E6B2"} width="94px" height="36px" onClick={displayUsers} borderRadius={"12px"}>
                Individuals
            </Button>
          <Button color={displayMode == "allTeams" ? "#ffffff" : "#7B69EC"} backgroundColor={displayMode == "allTeams" ? "#7B69EC" : "#E6E6E6B2"} width="94px" height="36px" onClick={displayTeams} borderRadius={"12px"}>
                Teams
            </Button>
        </Box>
        {displayMode=="allUsers" && (
          <UserDisplay data={data}/>
        )}
        {displayMode=="allTeams" && (
          <TeamsDisplay/>
        )}
      </CardBody>
    </Card>
  );
};

export default Display;
