import React from "react";
import { Footer } from "@hex-labs/core";

import TeamCard from "../teams/TeamCard";  //temp import
import Navigation from "./Navigation";
import Display from "./Display";

//temp card display 
const AppOutline: React.FC = () => (
  <>
    <Navigation />
    <TeamCard name="epic team" description="A team description that would tell individuals what the team is about." members={["skill1", "skill2", "skill3", "skill4"]} public={false}/>  
    <Display />
    <Footer />
  </>
);

export default AppOutline;
