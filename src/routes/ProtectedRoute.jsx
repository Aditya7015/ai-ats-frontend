import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const token = useSelector((state) => state.auth.token);
  const userRole = useSelector((state) => state.auth.role);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role && role !== userRole) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

export default ProtectedRoute;
