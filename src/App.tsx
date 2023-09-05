import { LoadingScreen, AuthProvider, useLogin, Footer } from "@hex-labs/core";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { setPersistence, getAuth, inMemoryPersistence } from "firebase/auth";
import EditProfile from "./components/EditProfile";
import Display from "./components/outline/Display";
import Navigation from "./components/outline/Navigation";

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
      <Navigation />
      <Routes>
        <Route path="" element={<Display />} />
        <Route path="/profile" element={<EditProfile />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
};
