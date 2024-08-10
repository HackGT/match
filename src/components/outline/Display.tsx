import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  Flex,
  Input,
  Box,
  CardBody,
  Button,
  useBreakpointValue,
  useDisclosure,
  Tooltip,
  Spacer,
} from "@chakra-ui/react";
import { GroupBase, OptionBase, Select } from "chakra-react-select";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { CommitmentLevels, Schools, Skills } from "../../definitions";
import UsersDisplay from "../users/UsersDisplay";
import TeamsDisplay from "../teams/TeamsDisplay";
import { getSearchParams } from "../../util/helpers";
import { apiUrl, LoadingScreen, Service, useAuth } from "@hex-labs/core";
import useAxios from "axios-hooks";
import NotRegisteredErrorScreen from "../../screens/NotRegisteredErrorScreen";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { MdOutlineNotificationsActive, MdOutlineNotificationsNone } from "react-icons/md";
import UserGuide from "../UserGuide";
import UserDrawer from "../users/UserDrawer";

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
  const { user } = useAuth();

  const skillOptions = useMemo(() => Skills, []);
  const commitmentOptions = useMemo(() => CommitmentLevels, []);
  const schoolOptions = useMemo(() => Schools, []);

  const guideDisclosure = useDisclosure();
  const notifDisclosure = useDisclosure();
  // const { isOpen, onOpen, onClose } = guideDisclosure;

  const [{ data, loading }] = useAxios({
    url: apiUrl(
      Service.HEXATHONS,
      `/hexathon-users/${process.env.REACT_APP_HEXATHON_ID}/users/${user?.uid}`
    ),
    method: "GET",
  });

  const [{ data: userData, loading: userLoading }] = useAxios({
    url: apiUrl(Service.AUTH, `/permissions/${user?.uid}`),
    method: "GET",
  });

  const [{ data: inviteData, loading: inviteLoading }] = useAxios({
    url: apiUrl(
      Service.HEXATHONS,
      `/teams/get-invites?hexathon=${process.env.REACT_APP_HEXATHON_ID}`
    ),
    method: "GET",
  });

  //   const teamRequests = [
  //     {
  //         members: [],
  //         public: false,
  //         hexathon: "647fee51768e521dc8ef88e0",
  //         name: "Team A",
  //         sentInvites: [
  //             {
  //                 member: "65c7e7afe487b453d90d579c",
  //                 message: "You are invited to join our team!",
  //                 id: "65c80369a5a1e7bac212161d"
  //             },
  //             {
  //                 member: "65c7e716e487b453d90d5799",
  //                 message: "You are invited to join our team!",
  //                 id: "65c80369a5a1e7bac212161e"
  //             }
  //         ],
  //         memberRequests: [],
  //         id: "65c7e559e487b453d90d5794"
  //     },
  //     {
  //         members: [],
  //         public: false,
  //         hexathon: "647fee51768e521dc8ef88e0",
  //         name: "Team C",
  //         sentInvites: [
  //             {
  //                 member: "65c7e753e487b453d90d579a",
  //                 message: "Hi there",
  //                 id: "65c80369a5a1e7bac212161f"
  //             },
  //             {
  //                 member: "65c7e786e487b453d90d579b",
  //                 message: "Hello there",
  //                 id: "65c80369a5a1e7bac2121620"
  //             },
  //             {
  //                 member: "65c7e7afe487b453d90d579c",
  //                 message: "You are invited to join our team!",
  //                 id: "65c80369a5a1e7bac2121621"
  //             }
  //         ],
  //         memberRequests: [],
  //         id: "65c7e5f7e487b453d90d5796"
  //     }
  // ]

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

  if (loading || userLoading || inviteLoading) return <LoadingScreen />;
  // Display not registered screen if an unregistered non-member tries to access the portal
  if (!data && !userData.roles.member) return <NotRegisteredErrorScreen />;

  const onSearchTextChange = (event: any) => {
    setSearchText(event.target.value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"));
    displayMode === DisplayType.USERS ? setUsersOffset(0) : setTeamsOffset(0);
  };

  interface GroupOption extends OptionBase {
    label: string;
    value: string;
  }

  function displayUsers() {
    setDisplayMode(DisplayType.USERS);
    setSearchText("");
    localStorage.setItem("displayMode", DisplayType.USERS);
  }

  function displayTeams() {
    setDisplayMode(DisplayType.TEAMS);
    setSearchText("");
    localStorage.setItem("displayMode", DisplayType.TEAMS);
  }

  return (
    <Card
      width={"96%"}
      height={"auto"}
      top={"50px"}
      left={"2%"}
      marginBottom={"50px"}
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
          <Spacer />
          <Box pl="10px">
            {inviteData?.length > 0 ? (
              <MdOutlineNotificationsActive
                style={{
                  height: 40,
                  width: 40,
                  cursor: "pointer",
                }}
                onClick={notifDisclosure.onOpen}
              />
            ) : (
              <MdOutlineNotificationsNone
                style={{
                  height: 40,
                  width: 40,
                  cursor: "pointer",
                }}
                onClick={notifDisclosure.onOpen}
              />
            )}
          </Box>
          <Box pl="10px">
            <Tooltip label="How do I use Match?">
              <InfoOutlineIcon
                w={10}
                h={10}
                color="#7B69EC"
                style={{ cursor: "pointer" }}
                onClick={guideDisclosure.onOpen}
              />
            </Tooltip>
          </Box>
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
            search={searchText as string}
            teamsOffset={teamsOffset}
            setTeamsOffset={setTeamsOffset}
          />
        )}
      </CardBody>
      <UserGuide
        isOpen={guideDisclosure.isOpen}
        onOpen={guideDisclosure.onOpen}
        onClose={guideDisclosure.onClose}
      />
      <UserDrawer
        isOpen={notifDisclosure.isOpen}
        onOpen={notifDisclosure.onOpen}
        onClose={notifDisclosure.onClose}
        teamRequests={inviteData}
        user={user}
      />
    </Card>
  );
};

export default Display;
