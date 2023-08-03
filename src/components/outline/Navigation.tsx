import React from "react";
import { apiUrl, Header, HeaderItem, Service } from "@hex-labs/core";
import axios from "axios";
import { Link } from "react-router-dom";

const Navigation: React.FC = () => {
  const logOut = async () => {
    await axios.post(apiUrl(Service.AUTH, "/auth/logout"));
    window.location.href = `https://login.hexlabs.org/login?redirect=${window.location.href}`;
  };

  return (
    <Header>
      <HeaderItem>
        <Link to="/profile">Edit Profile</Link>
      </HeaderItem>
      <HeaderItem>
        <Link to="/" onClick={logOut}>
          Sign Out
        </Link>
      </HeaderItem>
    </Header>
  );
};

export default Navigation;
