import { useState } from "react";
import { Mail, Lock, EyeOff, Eye, User, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    username?: string,
    email?: string,
    password?: string,
    confirmPassword?: string,
    general?: string
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!username.trim()) {
        newErrors.username = 'Username is required'
    }

    if (!email.trim()) {
       newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { 
       newErrors.email = 'Enter a valid email address'
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Password is required';
    } else if (confirmPassword.length < 6) {
      newErrors.confirmPassword = 'Password must be at least 6 characters';
    } else if (confirmPassword != password) {
        newErrors.confirmPassword = 'Passwords do not match'
    }

    return newErrors;
  }
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Here you would typically handle the login logic, e.g., API call
      console.log('sign up successful:', { email, password });
      // Redirect or show success message
      
      navigate('/dashboard');
    }, 2000);


  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold my-1">Sign up to continue</h1>
        <form onSubmit={handleRegister}>
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
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border ${errors.username ? 'border-red-500 focus:border-blue-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Create a username"
              />
            </div>
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
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
                className={`w-full pl-10 pr-4 py-2 border ${errors.email ? 'border-red-500 focus:border-blue-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="my-4">
            {/* <label htmlFor="password" className="block text-gray-700 py-1">
              Password
            </label> */}
            <div className="relative">
              <Lock size={20} className="absolute top-3 left-3 text-gray-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border ${errors.password ? 'border-red-500 focus:border-blue-500' : 'border-gray-300'}  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Create a password"
              />
              <span 
                className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-blue-500 transition duration-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div className="my-4">
            {/* <label htmlFor="confirm-password" className="block text-gray-700 py-1">
              Confirm Password
            </label> */}
            <div className="relative">
              <Lock size={20} className="absolute top-3 left-3 text-gray-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border ${errors.confirmPassword ? 'border-red-500 focus:border-blue-500' : 'border-gray-300'}  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Confirm password"
              />
              <span 
                className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-blue-500 transition duration-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <p className="text-right text-gray-600 mt-2">
             <a href="/forgot-password" className="text-blue-600 text-sm hover:underline">Forgot Password?</a>
          </p>

          <button 
            type="submit"
            disabled={loading}
            className={`flex justify-center items-center w-full ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'} text-white font-bold py-2 my-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin"/>
            ) : (
              'Sign up'
            )}
          </button>
        </form>

        <p className="text-center text-gray-500 py-1">or</p>

        <button className="w-full py-1 mt-1  rounded-md border-2 border-gray-500 hover:border-white cursor-pointer hover:bg-blue-600 hover:text-white focus:outline-none focus:border-none focus:ring-2 focus:ring-blue-500 transition duration-200">
          Sign up with Google
        </button>

        <p className="text-center text-gray-600 mt-5">
          Already a member? <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>
        
      </div>
    </div>
  );
};

export default Register;
