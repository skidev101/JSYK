import { useState } from "react";
import { Loader2, Mail } from "lucide-react";
import { useForgotPassword } from "../../hooks/useForgotPassword";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { forgotPassword, loading } = useForgotPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Email is required");
    }
    const result = await forgotPassword(email);
    if (result.success) {
      toast.success("Password reset link sent! Check your inbox.");
    } else {
      setError("Failed to send reset link. Try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-aside">
        <a className="app-brand" href="/" aria-label="JSYK home"><span className="app-brand-mark">J</span><span>jsyk</span></a>
        <div><p className="auth-aside-kicker">A small reset</p><h1>Back to the conversations.</h1><p>We will send a fresh link to the email connected to your account.</p></div>
        <span className="auth-aside-foot">JSYK, just so you know.</span>
      </div>
      <div className="auth-content"><div className="auth-form-shell">
        <p className="auth-eyebrow">Account access</p>
        <h2>Reset your password.</h2>
        <p className="auth-subtitle">Enter your email and we will take it from here.</p>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto mt-2">
          <div className="my-4">
            {/* <label htmlFor="email" className="block text-gray-700 py-1">
              Email
            </label> */}
            <div className="auth-input-wrap">
              <Mail size={20} className="absolute top-3 left-3 text-gray-500" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`auth-input ${
                  error ? "border-red-500" : "border-gray-300"
                } rounded-md outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your email"
              />
            </div>
            {error && (
              <p className="auth-error">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`auth-submit-button ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white font-bold py-2 my-4 cursor-pointer rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                "Reset"
              )}
            </button>
          </div>
        </form>
      </div></div>
    </div>
  );
};

export default ForgotPassword;
