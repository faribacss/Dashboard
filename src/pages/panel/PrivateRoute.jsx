// Library
import { Navigate } from "react-router-dom";

// Store
import { useStore } from "@/components/store";

// Protected Route Component
export const PrivateRoute = ({ children }) => {
  const jwt = useStore((state) => state.jwt);
  if (!jwt) {
    return <Navigate to="/" replace />;
  }
  return children;
};
