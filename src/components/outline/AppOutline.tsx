import React from "react";
import { Footer } from "@hex-labs/core";

import TeamCard from "../TeamCard";  //temp import
import Navigation from "./Navigation";
import Display from "./Display";

//temp card display
const AppOutline: React.FC = () => (
  <>
    <Navigation />
    <TeamCard name="Test" description="test" members={[]} public={false}/>  
    <Display />
    <Footer />
  </>
);

export default AppOutline;
