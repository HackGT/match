import React, { useEffect, useState } from "react";
import { Footer, Service, apiUrl } from "@hex-labs/core";

import Navigation from "./Navigation";
import Display from "./Display";
import { userData } from "../../definitions/DummyUserData";

const AppOutline: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  // TODO: We need to get the hexathon users from the API

  return (
    <>
      <Navigation />
      <Display users={userData} />
      <Footer />
    </>
  );
};

export default AppOutline;
