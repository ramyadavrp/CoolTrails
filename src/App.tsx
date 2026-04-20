import React from 'react';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { useEffect } from "react";
import AppRoute from "./routes/AppRoute"; 
import { handleLogout } from './utils/storage';
const TAB_KEY = "open_tabs";
const PROFILE_KEY = "user_profile";

export default function App() {

  useEffect(() => {
    // 1 tab open → count++
  //   const tabs = Number(localStorage.getItem(TAB_KEY) || 0) + 1;
  //   // console.log('tabs',tabs);
  //   localStorage.setItem(TAB_KEY, String(tabs));

  //   const onClose = () => {
  //     const remaining = Number(localStorage.getItem(TAB_KEY) || 1) - 1;

  //     if (remaining <= 0) {
  //       // browser fully closed (all tabs)
  //       localStorage.removeItem("token");
  //       localStorage.removeItem("id");
  //       localStorage.removeItem("login");
  //       localStorage.removeItem("email");
  //       // localStorage.removeItem("trailId");
  //       localStorage.removeItem(PROFILE_KEY);
  //       localStorage.removeItem(TAB_KEY);
  //     } else {
  //       localStorage.setItem(TAB_KEY, String(remaining));
  //     }
  //   };

  //   window.addEventListener("beforeunload", onClose);

  //   return () => {
  //     // onClose();
  //     window.removeEventListener("beforeunload", onClose);
  //   };
  }, []);

  return <AppRoute />;
}

