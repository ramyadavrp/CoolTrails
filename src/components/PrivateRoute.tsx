// src/components/PrivateRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  // You can add props here if needed, e.g., roles for role-based access control
}

const PrivateRoute: React.FC<PrivateRouteProps> = () => {
  const token = localStorage.getItem('token'); // Check for the token

  // If token exists, render the child routes; otherwise, redirect to login
  return token ? <Outlet /> : <Navigate to="/login" replace state={{ tab: 'signin' }} />;
};

export default PrivateRoute;