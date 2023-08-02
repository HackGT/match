import React, { useEffect, useState } from "react";
import { Footer, Service, apiUrl } from "@hex-labs/core";
import axios from "axios";

import Navigation from "./Navigation";
import Display from "./Display";
import Card from "../UserCard";
import { UserCardType } from "../../types/UserCard";

const AppOutline: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  // 647fee51768e521dc8ef88e0 hackGTX
  // 62d9ed68d0a69b88c06bdfb2 HackGT9
  // 640680f0c791f79de667dfa9 Test1
  // 62adf8b633b2c3301a295ed3 Dev1

  useEffect(() => {
    const getUsers = async () => {
      const hexUrl = apiUrl(Service.HEXATHONS, "/hexathon-users/647fee51768e521dc8ef88e0/users");
      const hexData = await axios.get(hexUrl);
      setUsers(hexData?.data?.hexathonUsers);
    };
    getUsers();
  }, []);


  // Modify userData to dynamically create an object for each user in the users array
  const userData: UserCardType[] = users.map((user) => ({
    name: user?.name,
    profile: {
      school: user?.profile?.school,
      year: user?.profile?.year,
      major: user?.profile?.major,
      description: user?.profile?.description,
      skills: user?.profile?.skills,
      commitmentLevel: user?.profile?.commitmentLevel, 
    }
  }));

  return (
    <>
      <Navigation />
      <Display users={userData}/>
      <Footer />
    </>
  );
};

export default AppOutline;
