import React, { useState } from "react";
import { Footer, Service, apiUrl } from "@hex-labs/core";
import useAxios from "axios-hooks";

import Navigation from "./Navigation";
import Display from "./Display";
import { UserCardType } from "../../types/UserCard";

const AppOutline: React.FC = () => {
  const [{ data: hexData, loading: hexLoading, error: hexError }] = useAxios(
    apiUrl(Service.HEXATHONS, `/hexathon-users/${process.env.REACT_APP_HEXATHON_ID}/users`)
    
  );

  const users = hexData?.hexathonUsers || [];
  
  // Modify userData to dynamically create an object for each user in the users array
  const userData: UserCardType[] = users.map((
    user: { name: string; 
      profile: { 
        school: string; 
        year: string; 
        major: string; 
        description: string; 
        skills: string[]; 
        commitmentLevel: string; 
      }; 
    }) => 
    ({
    name: user?.name,
    profile: {
      school: user?.profile?.school,
      year: user?.profile?.year,
      major: user?.profile?.major,
      description: user?.profile?.description,
      skills: user?.profile?.skills,
      commitmentLevel: user?.profile?.commitmentLevel,
    },
    })
  );

  return (
    <>
      <Navigation />
      <Display users={userData} />
      <Footer />
    </>
  );
};

export default AppOutline;
