import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  Flex,
  Input,
  Text,
  Box,
  CardBody,
  Button,
  ButtonGroup,
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { GroupBase, OptionBase, Select } from "chakra-react-select";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { UserCardType } from "../../types/UserCard";
import { CommitmentLevels, Schools, Skills } from "../../definitions";
import UserCard from "../UserCard";
import { apiUrl, Service, ErrorScreen, useAuth } from "@hex-labs/core";
import useAxios from "axios-hooks";

const limit = 50;

const Display: React.FC = () => {
  const title = process.env.REACT_APP_EVENT_NAME;
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState("");
  const [offset, setOffset] = useState(0);
  const [commitmentSelectValue, setCommitmentSelectValue] = useState<GroupOption[]>([]);
  const [skillSelectValue, setSkillSelectValue] = useState<GroupOption[]>([]);
  const [schoolSelectValue, setSchoolSelectValue] = useState<GroupOption[]>([]);

  const isMobile = useBreakpointValue({ base: true, md: false });

  const [{ data, loading, error }] = useAxios({
    method: "GET",
    url: apiUrl(Service.HEXATHONS, `/hexathon-users/${process.env.REACT_APP_HEXATHON_ID}/users`),
    params: {
      matched: true,
      skills: searchParams.get("skill")?.split(","),
      commitmentLevel: searchParams.get("commitment")?.split(","),
      school: searchParams.get("school")?.split(","),
      search: searchText,
      offset,
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

  useEffect(() => {
    if (!data) {
      setResultsText("Showing 0 results");
    } else if (
      data.offset === undefined ||
      data.total === undefined ||
      data.hexathonUsers.length === 0
    ) {
      setResultsText(`Showing ${data.hexathonUsers.length} results`);
    } else {
      setResultsText(
        `Showing ${data.offset + 1} to ${data.offset + data.hexathonUsers.length} of ${
          data.total
        } results`
      );
    }
  }, [data]);

  const onPreviousClicked = () => {
    setOffset(offset - limit);
  };

  const onNextClicked = () => {
    setOffset(offset + limit);
  };

  const onSearchTextChange = (event: any) => {
    setSearchText(event.target.value);
    setOffset(0);
  };

  const [resultsText, setResultsText] = useState("Loading...");

  if (error) return <ErrorScreen error={error} />;

  const hasPrevious = useMemo(() => {
    if (!data || data.offset === undefined) {
      return false;
    }
    return data.offset && data.offset > 0;
  }, [data]);
  const hasNext = useMemo(() => {
    if (!data || data.offset === undefined || data.total === undefined || !data) {
      return false;
    }
    console.log(data.total > data.offset + data.hexathonUsers.length);
    return data.total > data.offset + data.hexathonUsers.length;
  }, [data]);

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
            onChange={onSearchTextChange}
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
      <Box px={{ base: "4", md: "6" }} pb="5">
        <HStack spacing="3" justify="space-between">
          {!isMobile && (
            <Text color="muted" fontSize="sm">
              {resultsText}
            </Text>
          )}
          <ButtonGroup
            spacing="3"
            justifyContent="space-between"
            width={{ base: "full", md: "auto" }}
            variant="secondary"
          >
            <Button isDisabled={!hasPrevious} onClick={onPreviousClicked} variant="outline">
              Previous
            </Button>
            <Button isDisabled={!hasNext} onClick={onNextClicked} variant="outline">
              Next
            </Button>
          </ButtonGroup>
        </HStack>
      </Box>
    </Card>
  );
};

export default Display;
