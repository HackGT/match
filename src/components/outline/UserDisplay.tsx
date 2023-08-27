import React, { useState, useEffect, useMemo } from "react";
import { Card, Flex, Input, Text, Box, CardBody } from "@chakra-ui/react";
import { GroupBase, OptionBase, Select } from "chakra-react-select";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { UserCardType } from "../../types/UserCard";
import { CommitmentLevels, Schools, Skills } from "../../definitions";
import UserCard from "../UserCard";
import { apiUrl, Service, ErrorScreen, useAuth } from "@hex-labs/core";
import useAxios from "axios-hooks";

const UserDisplay: React.FC = () => {
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
      <div>
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
      </div>
    );
  };
  
  export default UserDisplay;