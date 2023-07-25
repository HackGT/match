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

  // 647fee51768e521dc8ef88e0

  useEffect(() => {
    const getUsers = async () => {
      const hexUrl = apiUrl(Service.HEXATHONS, "/hexathon-users/647fee51768e521dc8ef88e0/users");
      const hexData = await axios.get(hexUrl);
      const tempUrl = apiUrl(Service.USERS, "/users/TL9Yj7E1fOSNND1kemfXIOA7B5m1");
      const tempData = await axios.get(tempUrl);
      console.log(tempData);
      setUsers(hexData?.data?.hexathonUsers);
    };
    getUsers();
  }, []);

  const userData: UserCardType[] = [
    {
      name: users[0]?.name,
      profile: {
        school: users[0]?.profile?.school,
        year: users[0]?.profile?.year,
        major: users[0]?.profile?.major,
        description: users[0]?.profile?.description,
        skills: users[0]?.profile?.skills,
        commitmentLevel: users[0]?.profile?.commitmentLevel, 
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
