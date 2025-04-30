// src/components/AdminProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem("User"));
  console.log("🛡️ Checking Admin User:", userInfo);

  if (!userInfo) {
    console.log("❌ No user logged in, going to Home");
    return <Navigate to="/" replace />;
  }

  if (userInfo.role !== "admin") {
    console.log("❌ Not admin user, going to Home");
    return <Navigate to="/" replace />;
  }

  console.log("✅ Admin access granted");
  return children;
};

export default AdminProtectedRoute;
