import React from "react";
import { Footer } from "@hex-labs/core";

import Navigation from "./Navigation";
import Display from "./Display";

const AppOutline: React.FC = () => (
  <>
    <Navigation />
    <Display />
    <Footer />
  </>
);

export default AppOutline;
