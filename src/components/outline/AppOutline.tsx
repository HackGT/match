import React, { useEffect, useState } from "react";
import { Footer, Service, apiUrl } from "@hex-labs/core";
import axios from "axios";

import Navigation from "./Navigation";
import Display from "./Display";
import Card from "../Card";

const AppOutline: React.FC = () => {


  const [users, setUsers] = useState<any[]>([]);
  const [firstName, setFirstName] = useState("");
  //expect object, when u set the data of the object, then querry


  useEffect(() => {
    const getUsers = async () => {
      const requestUrl = apiUrl(Service.USERS, "/users");
      const data = await axios.get(requestUrl);
      console.log(data?.data?.profiles[0]?.name?.first);
      setFirstName(data?.data?.profiles[0]?.name);
      setUsers(data?.data?.profiles);
    };
    getUsers();
  }, []);

  const userData = {
    name: users[0]?.name?.first,
    description: "Quite dumb",
    college: "GT",
    year: "Sophomore",
    skills: ["literate", "not smart", "test", "testing again", "another test"],
    commitmentLevel: "A lot",
  };

  return (
    <>
      <Navigation />
      <Display />
      <Card {...userData} />
      <Footer />
    </>
  );
};

export default AppOutline;
