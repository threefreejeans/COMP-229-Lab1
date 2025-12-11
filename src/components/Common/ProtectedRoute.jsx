// src/components/Common/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/signin" replace />;
  if (adminOnly && user.role !== "admin") return <Navigate to="/" replace />;
  return children;
}
