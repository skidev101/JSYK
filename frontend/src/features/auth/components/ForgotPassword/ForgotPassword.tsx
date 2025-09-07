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
    <div className="flex items-center justify-center min-h-screen px-2 sm:px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h1 className="text-xl mb-6 text-gray-700">Reset Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto mt-2">
          <div className="my-4">
            {/* <label htmlFor="email" className="block text-gray-700 py-1">
              Email
            </label> */}
            <div className="relative">
              <Mail size={20} className="absolute top-3 left-3 text-gray-500" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border ${
                  error ? "border-red-500" : "border-gray-300"
                } rounded-md outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your email"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`flex justify-center items-center w-full ${
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
      </div>
    </div>
  );
};

export default ForgotPassword;
