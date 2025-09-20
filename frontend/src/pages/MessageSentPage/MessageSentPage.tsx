import AnimatedCheckmark from "@/shared/components/UI/AnimatedCheckMark";
import { useLocation, useNavigate } from "react-router-dom";

const MessageSentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username;

  const handleSendAnother = () => {
    navigate(-1); // back to form
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-pink-100 to-purple-200 text-center px-4">
      <AnimatedCheckmark />

      <h1 className="mt-6 text-2xl font-semibold text-gray-800">
        Message Sent!
      </h1>
      <p className="mt-2 text-gray-600">
        Your message was delivered to{" "}
        <span className="shimmer-text">@{username}</span> anonymously.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleSendAnother}
          className="rounded-full bg-black px-6 py-3 text-white font-medium shadow hover:bg-gray-800 transition hover:cursor-pointer"
        >
          Send Another
        </button>
        <button
          onClick={handleSignUp}
          className="rounded-full bg-gray-400 px-6 py-3 text-white font-medium shadow hover:bg-pink-700 transition hover:cursor-pointer"
        >
          Sign Up
        </button>
      </div>

      <p className="fixed bottom-3 text-sm text-gray-500">
        JSYK by{" "}
        <a
          href="https://x.com/monaski_"
          className="text-blue-500 hover:text-blue-600 transition-colors duration-200 underline"
        >
          monaski
        </a>
      </p>
    </div>
  );
};

export default MessageSentPage;
