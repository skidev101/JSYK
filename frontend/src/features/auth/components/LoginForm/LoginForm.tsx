import { useState } from "react";
import { Mail, Lock, EyeOff, Eye, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/shared/services/firebase/config";
// import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { getFirebaseErrorMessage } from "@/shared/utils/firebaseErrors";
// import { useAxiosPrivate } from "@/shared/hooks/useAxiosPrivate";

const Login = () => {
  // const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleGoogleSignin = async (e: React.FormEvent) => {
    const provider = new GoogleAuthProvider();
    // const axiosPrivate = useAxiosPrivate();

    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await signInWithPopup(auth, provider);
      // const idToken = await result.user.getIdToken();

      // const response = await axiosPrivate.post("/auth");

      // console.log("Response to google signin from backend:", response.data);

      // login(response.data.data);
      navigate("/dashboard");
      toast.success("Login successful");
    } catch (err: any) {
      toast.error(getFirebaseErrorMessage(err.code));
      console.log("google signin error", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const validationErrors = validate(); // validate for errors
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      // toast.success("login successful");

    } catch (err: any) {
      //setErrors({ general: err });
      toast.error(getFirebaseErrorMessage(err.code));
      console.error("login error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-aside">
        <a className="app-brand" href="/" aria-label="JSYK home"><span className="app-brand-mark">J</span><span>jsyk</span></a>
        <div><p className="auth-aside-kicker">The honest inbox</p><h1>Come back to the messages that matter.</h1><p>Private questions, real feedback, and the little things people only say when their name is out of the room.</p></div>
        <span className="auth-aside-foot">JSYK, just so you know.</span>
      </div>
      <div className="auth-content">
        <div className="auth-form-shell">
          <p className="auth-eyebrow">Welcome back</p>
          <h2>Log in to your inbox.</h2>
          <p className="auth-subtitle">Pick up where you left off.</p>

        <button
          disabled={loading}
          onClick={handleGoogleSignin}
          className={`auth-social-button ${
            loading ? "cursor-not-allowed" : "cursor-pointer"
          } bg-transparent hover:bg-gray-100 text-gray-500 font-bold py-2 mt-10 mb-2 shadow-sm border border-gray-300 cursor-pointer active:scale-[0.98] rounded-md transition duration-200`}
        >
          <img
            src="/google-icon.svg"
            alt="Google Icon"
            className="inline-block mr-2 w-5 h-5"
          />
          Continue with Google
        </button>

          <div className="auth-divider"><span>or continue with email</span></div>

        <form onSubmit={handleEmailSignin}>
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
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <p className="auth-error">{errors.email}</p>
            )}
          </div>

          <div className="my-4">
            {/* <label htmlFor="password" className="block text-gray-700 py-1">
              Password
            </label> */}
              <div className="auth-input-wrap">
              <Lock size={20} className="absolute top-3 left-3 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`auth-input ${
                  errors.password
                    ? "border-red-500 focus:border-blue-500"
                    : "border-gray-300"
                }  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your password"
              />
              <span
                className="auth-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            {errors.password && (
              <p className="auth-error">{errors.password}</p>
            )}
          </div>
          <div className="auth-forgot-row">
            <button
              type="button"
              onClick={() => navigate("/reset-password")}
              className="auth-link-button"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`auth-submit-button ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white font-bold py-2 my-2 cursor-pointer rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              "Submit"
            )}
          </button>
        </form>

        {/* <p className="text-center text-gray-500 py-1">or</p>

        <button
          disabled={loading}
          onClick={handleGoogleSignin}
          className={`flex justify-center items-center w-full ${
            loading ? "cursor-not-allowed" : "cursor-pointer"
          } bg-transparent hover:bg-gray-300 text-gray-500 font-bold py-2 my-2 shadow-sm border border-gray-300 cursor-pointer active:scale-[0.98] rounded-md transition duration-200`}
        >
          <img
            src="/google-icon.svg"
            alt="Google Icon"
            className="inline-block mr-2 w-5 h-5"
          />
          Continue with Google
        </button> */}

        <p className="auth-switch">
          Don't have an account?{" "}
          <a href="/register" className="auth-link">
            Register
          </a>
        </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
