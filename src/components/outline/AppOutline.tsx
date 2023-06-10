import { Footer } from "@hex-labs/core";
import React from "react";

import Navigation from "./Navigation";
import Display from "./Display";

const AppOutline: React.FC = () => {
  return (
    <>
      <Navigation />
      <Display />
      <Footer />
    </>
  );
};

export default AppOutline;
