import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setemail } from "../../../store/userAction";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

// Axios with cookies
axios.defaults.withCredentials = true;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v2/user/login",
        { email, password }
      );
      dispatch(setemail(email));
      navigate("/home");
    } catch (err) {
      setError("There was an error logging in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative bg-gradient-to-br from-blue-500 via-fuchsia-400 to-indigo-900 overflow-hidden">
      {/* Gorgeous Blurry Circles for depth */}
      <span className="absolute -top-24 -left-24 w-64 h-64 bg-pink-400/30 rounded-full blur-3xl z-0" />
      <span className="absolute top-40 right-10 w-80 h-60 bg-blue-400/20 rounded-full blur-2xl z-0" />
      <span className="absolute bottom-0 left-1/2 w-[400px] h-40 bg-fuchsia-500/20 rounded-full blur-2xl -translate-x-1/2 z-0" />

      {/* GLASS CARD */}
      <div className="relative max-w-md w-full shadow-2xl rounded-3xl bg-white/80 backdrop-blur-2xl p-8 sm:p-10 border border-white/50 z-10">
        <div className="flex flex-col items-center mb-6">
          <span className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-blue-500 to-pink-300 text-white rounded-full shadow-lg shadow-pink-200/30 mb-3">
            <Lock size={32} />
          </span>
          <h2 className="text-3xl font-extrabold text-slate-800 text-center tracking-tight drop-shadow">
            Welcome Back!
          </h2>
          <p className="text-md mt-2 text-slate-500 mb-1 text-center font-medium">
            Sign in to your account to continue
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
          <div>
            <label htmlFor="email" className="block text-base font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white/80 backdrop-blur transition-all text-lg"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-base font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-white/80 backdrop-blur transition-all text-lg"
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-800">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="/forgot-password"
                className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-150"
              >
                Forgot Password?
              </a>
            </div>
          </div>
          {error && (
            <div className="rounded-lg bg-red-100 border border-red-400 text-red-700 py-2 px-4 text-center animate-pulse">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-bold rounded-lg shadow-lg bg-gradient-to-r from-blue-600 via-fuchsia-500 to-indigo-700 text-white text-xl hover:scale-105 transition-transform
              ${loading ? "opacity-70 cursor-not-allowed" : ""}
            `}
          >
            {loading ? "Signing you in..." : "Sign In"}
          </button>
          <p className="text-center text-slate-600 font-medium mt-3">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-bold underline underline-offset-2 hover:text-purple-700 transition"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
