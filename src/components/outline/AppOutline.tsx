import React from "react";
import { Footer } from "@hex-labs/core";

import TeamCard from "../teams/TeamCard";  //temp import
import Navigation from "./Navigation";
import Display from "./Display";

//temp card display 
const AppOutline: React.FC = () => (
  <>
    <Navigation />
    
    <Display />
    <Footer />
  </>
);

export default AppOutline;
