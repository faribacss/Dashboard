// Library
import { useContext } from "react";
import { Navigate } from "react-router-dom";

// context
import { SaveInfoContext } from "@/context/SaveInfo.jsx";

// Protected Route Component
export const PrivateRoute = ({ children }) => {
  const { user } = useContext(SaveInfoContext);
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};
