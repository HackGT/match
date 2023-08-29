import React, { useState, useEffect, useMemo } from "react";
import {Text} from "@chakra-ui/react"
import { TeamCardType } from "../../types/TeamCard";
import TeamCard from "./TeamCard";

interface Props {
    teamName: string;
    description: string;
    members: string[];
    search: string;
  }

const TeamsDisplay: React.FC = () =>{
    return(
        <Text>Teams</Text>
    )
};

export default TeamsDisplay;