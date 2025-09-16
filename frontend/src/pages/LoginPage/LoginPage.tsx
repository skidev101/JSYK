import { useAuth } from "@/context/AuthContext";
import { LoginForm } from "@/features/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {

     if (!loading && user) {
       navigate("/dashboard");
     }
  }, [user, loading, navigate])

  return <LoginForm />
};

export default LoginPage;
