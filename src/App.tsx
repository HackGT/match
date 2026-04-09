import React from "react";
import { LoadingScreen, AuthProvider, useLogin, Footer } from "@hex-labs/core";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { setPersistence, getAuth, inMemoryPersistence } from "firebase/auth";
import EditProfile from "./components/EditProfile";
import Navigation from "./components/outline/Navigation";
import Display from "./components/outline/Display";
import TeamJoin from "./components/teams/TeamJoin";

export const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "auth.hexlabs.org",
});
setPersistence(getAuth(app), inMemoryPersistence);

axios.defaults.withCredentials = true;

export const App = () => {
  const [loading, loggedIn] = useLogin(app);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!loggedIn) {
    window.location.href = `https://login.hexlabs.org/login?redirect=${window.location.href}`;
    return <LoadingScreen />;
  }

  return (
    <AuthProvider app={app}>
      <Navigation />
      <Routes>
        <Route path="" element={<Display />} />
        <Route path="/profile" element={<EditProfile />} />
        <Route path="/jointeam" element={<TeamJoin />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
};
