import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const expiryStr = localStorage.getItem('token_expiry');
    const isActive = sessionStorage.getItem("isActive");
    // console.log('token get expiryStr',expiryStr);
    // console.log("token:", token);
    // console.log("expiry:", expiryStr);
    // console.log("isActive:", isActive);

    if (!isActive) {
      localStorage.clear();
      setIsAuthenticated(false);
      return;
    }

    if (!token) {
      setIsAuthenticated(false);
      return;
    }
    if (!expiryStr || isNaN(Number(expiryStr)) || Date.now() > Number(expiryStr)) {
      localStorage.clear();
      setIsAuthenticated(false);
      return;
    }
    setIsAuthenticated(true);
  };

  useEffect(() => {
    checkAuth(); // first run

    const interval = setInterval(() => {
      checkAuth(); // auto check every second
    }, 1000); // 1 sec (testing ke liye)

    return () => clearInterval(interval);
  }, []);

  if (isAuthenticated === null) return null;

  return isAuthenticated
    ? <Outlet />
    : <Navigate to="/login" replace />;
};

export default PrivateRoute;