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
    {
      name: "TEMPORARY USER",
      profile: {
        school: "TEMPORARY SCHOOL",
        year: "TEMPORARY YEAR",
        major: "TEMPORARY MAJOR",
        description: "TEMPORARY DESCRIPTION",
        skills: ["test", "test", "test", "testing again", "another test"],
        commitmentLevel: "test", //planning on dealing with commitment type and background conditionals
      }
    },
  ];

  return (
    <>
      <Navigation />
      <Display users={userData}/>
      <Footer />
    </>
  );
};

export default AppOutline;
