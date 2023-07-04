import { Footer } from "@hex-labs/core";
import React from "react";
import { Flex } from "@chakra-ui/react";

import Navigation from "./Navigation";
import Display from "./Display";
import Filters from "./Filters";

const AppOutline: React.FC = () => {
  return (
    <>
      <Navigation />
      <Flex>
        <Filters />
        <Display />
      </Flex>
      <Footer />
    </>
  );
};

export default AppOutline;
