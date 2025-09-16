import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <section className="flex flex-col justify-center items-center min-h-screen p-4 text-center">
      <img
        src="/404-error.png"
        alt="Not found"
        className="w-36 h-36 mb-4 opacity-80"
      />
      <h1 className="text-2xl font-bold text-blue-500">Not found</h1>
      <p className="mt-2 text-gray-600">
        The page you're looking for doesn't exist.
      </p>

      {user ? (
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 cursor-pointer active:scale-[0.95]"
        >
          Back to Dashboard
        </button>
      ) : (
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 cursor-pointer active:scale-[0.95]"
        >
          Home
        </button>
      )}
    </section>
  );
};

export default NotFoundPage;
