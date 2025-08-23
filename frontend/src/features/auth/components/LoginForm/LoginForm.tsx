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
      setLoading(false);
      navigate("/");
      toast.success("Login successful");
    } catch (err: any) {
      toast.error(err.message);
      setLoading(false);
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
      // const idToken = await result.user.getIdToken();

      // console.log("User logged in:", result.user);

      // const response = await axiosPrivate.post("/auth");

      // console.log("Response to email signin from backend:", response.data);

      // login(response.data.data);

      toast.success("login successful");

      navigate("/");
    } catch (err: any) {
      //setErrors({ general: err });
      toast.error("Login failed");
      setLoading(false);
      console.error("login error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h1 className="text-3xl font-bold my-2">Welcome back</h1>
        <h2 className="text-2xl my-1">Login to continue</h2>
        <form onSubmit={handleEmailSignin}>
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
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="my-4">
            {/* <label htmlFor="password" className="block text-gray-700 py-1">
              Password
            </label> */}
            <div className="relative">
              <Lock size={20} className="absolute top-3 left-3 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border ${
                  errors.password
                    ? "border-red-500 focus:border-blue-500"
                    : "border-gray-300"
                }  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your password"
              />
              <span
                className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-blue-500 transition duration-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <p className="text-right text-gray-600 mt-2">
            <a
              href="/forgot-password"
              className="text-blue-600 text-sm hover:underline"
            >
              Forgot Password?
            </a>
          </p>

          <button
            type="submit"
            onClick={handleEmailSignin}
            disabled={loading}
            className={`flex justify-center items-center w-full ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white font-bold py-2 my-2 cursor-pointer rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-500 py-1">or</p>

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
        </button>

        <p className="text-center text-gray-600 mt-5">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
