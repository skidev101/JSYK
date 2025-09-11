import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    // If no user → go to login
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    // If admin → send to admin dashboard
    if (user.role === "Admin") {
      navigate("/admin/dashboard", { replace: true });
      return;
    }

    // If normal user → send to user dashboard
    if (user.role === "User") {
      navigate("/dashboard", { replace: true });
      return;
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div className="text-sm font-bold">Loading...</div>;
  }

  if (!user) {
    return null; // while redirecting
  }

  // If route requires admin but user isn’t one → kick to /dashboard
  if (adminOnly && user.role !== "Admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // Render protected content if everything checks out
  return <>{children}</>;
};

export default ProtectedRoute;
