import React, { useEffect, useState } from "react";
import { Footer, Service, apiUrl } from "@hex-labs/core";
import axios from "axios";

import Navigation from "./Navigation";
import Display from "./Display";
import Card from "../UserCard";
import { UserCardType } from "../../types/UserCard";

const AppOutline: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  // TODO: We need to get the hexathon users from the API

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const hexUrl = apiUrl(Service.HEXATHONS, "hexathon-users/647fee51768e521dc8ef88e0/users");
  //     const hexData = await axios.get(hexUrl);
  //     console.log(hexData);
  //     setUsers(data?.data?.profiles);
  //   };
  //   getUsers();
  // }, []);

  // Temporarily resorting to regular users since hackGTX has 0 users
  // However, the API calls were made above to help
  const userData: UserCardType[] = [
    { name: "User 1", profile: {matched: true, school: "Georgia Institute of Technology", year: "3rd year", major: "Computer Science", description: "Hello, my name is bleh bleh bleh", commitmentLevel: "High",  skills: ["Java", "Python", "Node"], isJudging: true }},
    { name: "User 2", profile: {matched: true, school: "UGA", year: "2nd year", major: "Computational Media", description: "Hello, my name is bleh bleh bleh", commitmentLevel: "Medium",  skills: ["C", "JavaScript"], isJudging: true }},
    { name: "User 3", profile: {matched: true, school: "Georgia Institute of Technology", year: "1st year", major: "Computer Science", description: "Hello, my name is bleh bleh bleh", commitmentLevel: "Low",  skills: ["React", "Node", "Express"], isJudging: true }},
    { name: "User 4", profile: {matched: true, school: "USG", year: "3rd year", major: "Computer Science", description: "Hello, my name is bleh bleh bleh", commitmentLevel: "High",  skills: ["Machine Learning", "Python", "Node"], isJudging: true }},
    { name: "User 5", profile: {matched: true, school: "University of Maryland", year: "4th year", major: "Computer Science", description: "Hello, my name is bleh bleh bleh", commitmentLevel: "Medium",  skills: ["HTML/CSS", "C#", "C++"], isJudging: true }},
    { name: "User 6", profile: {matched: true, school: "Emory", year: "3rd year", major: "Computer Science", description: "Hello, my name is bleh bleh bleh", commitmentLevel: "Low",  skills: ["Java", "Python", "Node"], isJudging: true }},
  ];
  // const userData: UserCardType[] = [
  //   {
  //     name: "TEMPORARY USER",
  //     profile: {
  //       school: "TEMPORARY SCHOOL",
  //       year: "TEMPORARY YEAR",
  //       major: "TEMPORARY MAJOR",
  //       description: "TEMPORARY DESCRIPTION",
  //       skills: ["test", "test", "test", "testing again", "another test"],
  //       commitmentLevel: "test", //planning on dealing with commitment type and background conditionals
  //     }
  //   },
  // ];

  return (
    <>
      <Navigation />
      <Display users={userData}/>
      <Footer />
    </>
  );
};

export default AppOutline;
