/* eslint-disable */
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";

export const ProtectedRoute = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return <>{currentUser ? <Outlet /> : navigate("/login")}</>;
};
