import React from 'react';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { useEffect } from "react";
import AppRoute from './routes/AppRoute';


const PROFILE_KEY = "user_profile";
export default function App() {
  useEffect(() => {
    const alive = sessionStorage.getItem("browser_alive");

    if (!alive) {
      // browser was closed
      // localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("id");
      localStorage.removeItem("login");
      localStorage.removeItem(PROFILE_KEY);
    }

    // mark current browser session
    sessionStorage.setItem("browser_alive", "true");
  }, []);
  return <AppRoute />;
}
