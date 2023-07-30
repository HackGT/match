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

  // 647fee51768e521dc8ef88e0 hackGTX
  // 62d9ed68d0a69b88c06bdfb2 HackGT9
  // 640680f0c791f79de667dfa9 Test1
  // 62adf8b633b2c3301a295ed3 Dev1

  useEffect(() => {
    const getUsers = async () => {
      const hexUrl = apiUrl(Service.HEXATHONS, "/hexathon-users/647fee51768e521dc8ef88e0/users");
      const hexData = await axios.get(hexUrl);
      console.log(hexData);
      setUsers(hexData?.data?.hexathonUsers);
    };
    getUsers();
  }, []);

  // users[0]?.name
  // users[0]?.profile?.school
  // users[0]?.profile?.year
  // users[0]?.profile?.major
  // users[0]?.profile?.description
  // users[0]?.profile?.skills
  // users[0]?.profile?.commitmentLevel

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
      // name: "test",
      // profile: {
      //   school: "test",
      //   year: "test",
      //   major: "test",
      //   description: "test",
      //   skills: ["test", "test"],
      //   commitmentLevel: "test", 
      // }
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
