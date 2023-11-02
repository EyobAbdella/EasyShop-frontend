import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRouter() {
  const { authTokens } = useContext(AuthContext);
  if (authTokens) return <Outlet />;
  return <Navigate to='/login' />;
}
