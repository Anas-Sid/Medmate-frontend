// components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const doctor = JSON.parse(localStorage.getItem("doctor"));
  const patient = JSON.parse(localStorage.getItem("patient"));

  // If neither doctor nor patient is logged in → redirect to login
  if (!doctor && !patient) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
