import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AppContext);

  if (loading) return <p>Loading...</p>; // spinner until user is checked

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
