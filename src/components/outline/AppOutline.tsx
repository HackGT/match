import React, { useEffect, useState } from "react";
import { Footer, Service, apiUrl } from "@hex-labs/core";
import axios from "axios";

import Navigation from "./Navigation";
import Display from "./Display";
import Card from "../Card";

const AppOutline: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  // HACKGTX ID: 647fee51768e521dc8ef88e0
  // HACKGT 9 ID: 62d9ed68d0a69b88c06bdfb2

  useEffect(() => {
    const getUsers = async () => {
      const requestUrl = apiUrl(Service.USERS, "/users");
      const data = await axios.get(requestUrl);
      const hexUrl = apiUrl(Service.HEXATHONS, "hexathon-users/647fee51768e521dc8ef88e0/users");
      const hexData = await axios.get(hexUrl);
      console.log(hexData);
      setUsers(data?.data?.profiles);
    };
    getUsers();
  }, []);

  // Temporarily resorting to regular users since hackGTX has 0 users
  // Also temporarily using the first user in the lists of users 
  // However, the API calls were made above to help
  const userData = [{
    name: users[0]?.name?.first + " " + users[0]?.name?.last, 
    description: "TEMPORARY DESCRIPTION",
    school: "TEMPORARY SCHOOL",
    year: "TEMPORARY YEAR",
    skills: ["test", "test", "test", "testing again", "another test"],
    commitmentLevel: "test",  //planning on dealing with commitment type and background conditionals
  }];

  return (
    <>
      <Navigation />
      <Display users={userData} />
      <Footer />
    </>
  );
};

export default AppOutline;
