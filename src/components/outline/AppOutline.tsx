import React from "react";
import { Footer } from "@hex-labs/core";
import axios from "axios";

import Navigation from "./Navigation";
import Display from "./Display";
import Card from "../Card";

const AppOutline: React.FC = () => {
  const userData = {
    name: "Dummy",
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
