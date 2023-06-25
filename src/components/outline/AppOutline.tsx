import { Footer } from "@hex-labs/core";
import React from "react";

import Navigation from "./Navigation";
import Display from "./Display";
import Card from "../Card"

const AppOutline: React.FC = () => {
  return (
    <>
      <Navigation />
      <Display />
      <Card 
        name={"Dummy"} 
        description={"Quite dumb"} 
        college={"GT"} year={"Sophomore"} 
        skills={["literate", "not smart", "tset", "testing again", "another test"]} 
        commitmentLevel={"Some"} />
      <Footer />
    </>
  );
};

export default AppOutline;
