import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

const GuestRoute = ({ children }) => {
  const { user, loading } = useContext(AppContext);

  if (loading) return <p>Loading...</p>;

  if (user) {
    // ✅ Already logged in → go to home/dashboard
    return <Navigate to="/layout" replace />;
  }

  // ❌ Not logged in → allow access to login/signup
  return children;
};

export default GuestRoute;
