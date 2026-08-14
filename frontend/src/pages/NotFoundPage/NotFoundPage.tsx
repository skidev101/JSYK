import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <section className="not-found-page"><div className="not-found-shell">
      <img
        src="/404-error.png"
        alt="Not found"
        className="w-36 h-36 mb-4 opacity-80"
      />
      <h1>That page wandered off.</h1>
      <p className="mt-2 text-gray-600">
        The page you're looking for doesn't exist.
      </p>

      {user ? (
        <button
          onClick={() => navigate("/dashboard")}
          className="app-primary-button"
        >
          Back to Dashboard
        </button>
      ) : (
        <button
          onClick={() => navigate("/")}
          className="app-primary-button"
        >
          Home
        </button>
      )}
    </div></section>
  );
};

export default NotFoundPage;
