import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AppContext);

  if (loading) return <p>Loading...</p>; // spinner until user is checked

  if (!user) {
    // ❌ No user → redirect to login
    return <Navigate to="/" replace />;
  }

  // ✅ User logged in → allow access
  return children;
};

export default ProtectedRoute;
