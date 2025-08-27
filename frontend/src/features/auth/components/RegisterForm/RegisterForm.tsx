import { useState } from "react";
import {
  Mail,
  Lock,
  EyeOff,
  Eye,
  User,
  Loader2,
  CheckCircle2Icon,
  XCircleIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  type UserCredential,
} from "firebase/auth";
import { auth } from "@/shared/services/firebase/config";
import toast from "react-hot-toast";
import { useUsernameCheck } from "@/shared/hooks/useUsernameCheck";
import { validateUsername } from "@/shared/utils/validateUsername";
import { useAxiosPrivate } from "@/shared/hooks/useAxiosPrivate";

const Register = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const { status, message } = useUsernameCheck(username);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    username?: string;
    available?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};

    const usernameError = validateUsername(username);
    if (usernameError) newErrors.username = usernameError;

    // const emailError = validateEmail(email);
    if (!email.trim()) {
      newErrors.email = "Email is required"; //temporary validation. fix later
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Password is required";
    } else if (confirmPassword.length < 6) {
      newErrors.confirmPassword = "Password must be at least 6 characters";
    } else if (confirmPassword !== password.trim()) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleGoogleSignup = async (e: React.FormEvent) => {
    const provider = new GoogleAuthProvider();
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await signInWithPopup(auth, provider);
      // const idToken = await result.user.getIdToken();

      await axiosPrivate.post("/auth");

      // console.log("Response to email signin from backend:", response.data);
      // login(response.data.data);

      navigate("/");
      toast.success("Sign up successful");
    } catch (err: any) {
      toast.error(err.message);
      setLoading(false);
      console.error("google sign up error:", err);
    }
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      if (status === "taken") {
        setErrors((prev) => ({
          ...prev,
          username: "Username is already taken",
        }));
      }
      setLoading(false);
      return;
    }

    let result: UserCredential | null = null;

    try {
      result = await createUserWithEmailAndPassword(auth, email, password);
      // const idToken = await result.user.getIdToken();
      console.log("id token gotten at email register");

      await axiosPrivate.post("auth", {
        username: username,
      });

      // console.log("Response to email signin from backend:", response.data);

      navigate("/");
      toast.success("Sign up successful");
    } catch (err: any) {
      if (result?.user) {
        await result.user.delete(); // delete the user if signup fails
      }
      toast.error(err.message || "Sign up failed");
      console.error("signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-2 sm:px-4">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md w-full max-w-sm my-6">
        <h1 className="text-2xl font-bold mt-2">Sign up to continue</h1>

        <button
          disabled={loading}
          onClick={handleGoogleSignup}
          className={`flex justify-center items-center w-full ${
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

        <p className="text-center text-gray-500 pt-1">or</p>

        <form onSubmit={handleEmailSignup} className="">
          <div className="my-4">
            {/* <label htmlFor="username" className="block text-gray-700 py-1">
              Username
            </label> */}
            <div className="relative">
              <User size={20} className="absolute top-3 left-3 text-gray-500" />
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => {
                  const value = e.target.value;
                  setUsername(value);
                  const usernameErrors = validateUsername(value);
                  setErrors((prev) => ({
                    ...prev,
                    username: usernameErrors || undefined,
                  }));
                }}
                className={`w-full pl-10 pr-4 py-2 border ${
                  errors.username
                    ? "border-red-500 focus:border-blue-500"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Create a username"
              />
              {status === "checking" ? (
                <Loader2
                  size={18}
                  className={`animate-spin absolute ${
                    errors.username && "hidden"
                  } top-3 right-3 text-gray-500`}
                />
              ) : status === "available" ? (
                <CheckCircle2Icon
                  size={18}
                  className={`absolute ${
                    errors.username && "hidden"
                  } top-3 right-3 text-green-500`}
                />
              ) : status === "taken" ? (
                <XCircleIcon
                  size={18}
                  className="absolute top-3 right-3 text-red-500"
                />
              ) : null}
            </div>
            {status === "taken" && (
              <p className="text-red-500 text-sm mt-1">{message}</p>
            )}
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

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
                  errors.email
                    ? "border-red-500 focus:border-blue-500"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
                placeholder="Create a password"
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

          <div className="my-4">
            {/* <label htmlFor="confirm-password" className="block text-gray-700 py-1">
              Confirm Password
            </label> */}
            <div className="relative">
              <Lock size={20} className="absolute top-3 left-3 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border ${
                  errors.confirmPassword
                    ? "border-red-500 focus:border-blue-500"
                    : "border-gray-300"
                }  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Confirm password"
              />
              <span
                className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-blue-500 transition duration-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
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
            disabled={loading || status === "checking" || status === "taken"}
            className={`flex justify-center items-center w-full ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
            } text-white font-bold py-2 my-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              "Submit"
            )}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-5">
          Already a member?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
