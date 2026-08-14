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
    <div className="success-page">
      <div className="success-shell">
      <AnimatedCheckmark />

      <h1 className="mt-6 text-2xl font-semibold text-gray-800">
        Message Sent!
      </h1>
      <p className="mt-2 text-gray-600">
        Your message was delivered to <strong>@{username}</strong> anonymously.
      </p>

      <div className="success-actions">
        <button
          onClick={handleSendAnother}
          className="app-primary-button"
        >
          Send Another
        </button>
        <button
          onClick={handleSignUp}
          className="app-secondary-button"
        >
          Sign Up
        </button>
      </div>

      <p className="public-card-footer">
        JSYK by{" "}
        <a
          href="https://x.com/monaski_"
          className="text-blue-500 hover:text-blue-600 transition-colors duration-200 underline"
        >
          monaski
        </a>
      </p></div>
    </div>
  );
};

export default MessageSentPage;
