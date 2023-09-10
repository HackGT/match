import React, { useState, useEffect, useMemo } from "react";
import { Card, Flex, Input, Box, CardBody, Button, useBreakpointValue } from "@chakra-ui/react";
import { GroupBase, OptionBase, Select } from "chakra-react-select";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { CommitmentLevels, Schools, Skills } from "../../definitions";
import UsersDisplay from "../users/UsersDisplay";
import TeamsDisplay from "../teams/TeamsDisplay";
import { getSearchParams } from "../../util/helpers";
import { apiUrl, ErrorScreen, handleAxiosError, Service } from "@hex-labs/core";
import useAxios from "axios-hooks";
import axios from "axios";

export const limit = 50;

export enum DisplayType {
  USERS = "Users",
  TEAMS = "Teams",
}

const Display: React.FC = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState("");
  const [usersOffset, setUsersOffset] = useState(0);
  const [teamsOffset, setTeamsOffset] = useState(0);
  const [commitmentSelectValue, setCommitmentSelectValue] = useState<GroupOption[]>([]);
  const [skillSelectValue, setSkillSelectValue] = useState<GroupOption[]>([]);
  const [schoolSelectValue, setSchoolSelectValue] = useState<GroupOption[]>([]);
  const [displayMode, setDisplayMode] = useState(
    localStorage.getItem("displayMode") || DisplayType.USERS
  );
  const [membersData, setMembersData] = useState<Record<string, any>>({});

  const skillOptions = useMemo(() => Skills, []);
  const commitmentOptions = useMemo(() => CommitmentLevels, []);
  const schoolOptions = useMemo(() => Schools, []);

  // GET teams data while users data is being loaded to reduce latency on switching to TEAMS display
  const [{ data: teamsData, error }] = useAxios({
    method: "GET",
    url: apiUrl(Service.HEXATHONS, `/teams`),
    params: {
      hexathon: process.env.REACT_APP_HEXATHON_ID,
      offset: teamsOffset,
    },
  });

  if (error) return <ErrorScreen error={error} />;

  // Memoize the mapping (team.name -> array of hexathon users) for the team card
  useMemo(async () => {
    if (!teamsData) {
      return {};
    }

    const getUsers = async () => {
      const memberDataMap: Record<string, any> = {};

      await Promise.all(
        teamsData.teams.map(async (team: any) => {
          const memberPromises = team.members.map(async (member: any) => {
            try {
              const res = await axios.get(
                apiUrl(
                  Service.HEXATHONS,
                  `/hexathon-users/${process.env.REACT_APP_HEXATHON_ID}/users/${member}`
                )
              );
              return res.data;
            } catch (e: any) {
              handleAxiosError(e);
            }
          });
          const memberData = await Promise.all(memberPromises);

          memberDataMap[team.name] = memberData;
        })
      );

      setMembersData(memberDataMap);
      return memberDataMap;
    };

    return await getUsers();
  }, [teamsData]);

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

  const onSearchTextChange = (event: any) => {
    setSearchText(event.target.value);
    displayMode === DisplayType.USERS ? setUsersOffset(0) : setTeamsOffset(0);
  };

  interface GroupOption extends OptionBase {
    label: string;
    value: string;
  }

  function displayUsers() {
    setDisplayMode(DisplayType.USERS);
    localStorage.setItem("displayMode", DisplayType.USERS);
  }

  function displayTeams() {
    setDisplayMode(DisplayType.TEAMS);
    localStorage.setItem("displayMode", DisplayType.TEAMS);
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
        <Flex direction={isMobile ? "column" : "row"}>
          <Input
            placeholder="Search"
            onChange={onSearchTextChange}
            width={displayMode === DisplayType.USERS && !isMobile ? "256px" : "330px"}
            height={"40px"}
          />

          {displayMode === DisplayType.USERS && (
            <>
              <Box pl="10px" w={isMobile ? "320px" : "256px"}>
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

              <Box pl="10px" w={isMobile ? "320px" : "256px"}>
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

              <Box pl="10px" w={isMobile ? "320px" : "256px"}>
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
            </>
          )}
        </Flex>
        <br></br>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderRadius="12px"
          borderColor="#7B69EC"
          width="192px"
          height="42px"
          marginLeft={"auto"}
          marginRight={"auto"}
          backgroundColor={"#E6E6E6B2"}
        >
          <Button
            color={displayMode == DisplayType.USERS ? "#ffffff" : "#7B69EC"}
            backgroundColor={displayMode == DisplayType.USERS ? "#7B69EC" : "#E6E6E6B2"}
            width="124px"
            height="36px"
            onClick={displayUsers}
            borderRadius={"12px"}
            _hover={{ backgroundColor: displayMode == DisplayType.USERS ? "#8b7ee0" : "#dddcde" }}
          >
            Individuals
          </Button>
          <Button
            color={displayMode == DisplayType.TEAMS ? "#ffffff" : "#7B69EC"}
            backgroundColor={displayMode == DisplayType.TEAMS ? "#7B69EC" : "#E6E6E6B2"}
            width="94px"
            height="36px"
            onClick={displayTeams}
            borderRadius={"12px"}
            _hover={{ backgroundColor: displayMode == DisplayType.TEAMS ? "#8b7ee0" : "#dddcde" }}
          >
            Teams
          </Button>
        </Box>
        {displayMode === DisplayType.USERS ? (
          <UsersDisplay
            skills={getSearchParams(searchParams, "skill")}
            commitmentLevel={getSearchParams(searchParams, "commitment")}
            school={getSearchParams(searchParams, "school")}
            search={searchText as string}
            usersOffset={usersOffset}
            setUsersOffset={setUsersOffset}
          />
        ) : (
          <TeamsDisplay
            data={teamsData}
            membersData={membersData}
            search={searchText as string}
            teamsOffset={teamsOffset}
            setTeamsOffset={setTeamsOffset}
          />
        )}
      </CardBody>
    </Card>
  );
};

export default Display;
