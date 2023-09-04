import React from "react";
import { LoadingScreen, AuthProvider, useLogin } from "@hex-labs/core";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { setPersistence, getAuth, inMemoryPersistence } from "firebase/auth";
import AppOutline from "./components/outline/AppOutline";
import EditProfile from "./components/EditProfile";

export const app = initializeApp({
  apiKey: "AIzaSyCsukUZtMkI5FD_etGfefO4Sr7fHkZM7Rg",
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
    window.location.href = `https://login.hexlabs.org?redirect=${window.location.href}`;
    return <LoadingScreen />;
  }

  return (
    <AuthProvider app={app}>
      <Routes>
        <Route path="" element={<AppOutline />} />
        <Route path="/profile" element={<EditProfile />} />
      </Routes>
    </AuthProvider>
  );
};
