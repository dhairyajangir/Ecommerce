import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import axios from "axios";
import ValidationFormObject from "../../../validation";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(""); // success/error feedback

  const handleFileSubmit = (e) => {
    const file = e.target.files[0];
    if (file) setAvatar(file);
  };

  const validateFields = () => {
    const nameError = ValidationFormObject.validateName(name);
    const emailError = ValidationFormObject.validateEmail(email);
    const passwordError = ValidationFormObject.validatePassword(password);

    const newErrors = {};
    if (nameError !== true) newErrors.name = nameError;
    if (emailError !== true) newErrors.email = emailError;
    if (passwordError !== true) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    if (!validateFields()) return;

    setLoading(true);
    const newForm = new FormData();
    if (avatar) newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);

    try {
      await axios.post("http://localhost:8000/api/v2/user/create-user", newForm, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "any",
        },
      });
      setMsg("Signup successful! Log in to continue.");
      setEmail("");
      setName("");
      setPassword("");
      setAvatar(null);
    } catch (err) {
      setMsg("Signup failed. Try again or use a new email.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-tr from-blue-500 via-pink-200 to-fuchsia-700 overflow-hidden">
      {/* Floating Blobs */}
      <span className="absolute -top-24 -left-24 w-64 h-64 bg-pink-400/25 rounded-full blur-3xl z-0" />
      <span className="absolute bottom-0 right-10 w-80 h-64 bg-blue-400/20 rounded-full blur-2xl z-0" />
      {/* Glass Card */}
      <div className="relative w-full max-w-md bg-white/90 border border-blue-200/50 rounded-3xl shadow-xl shadow-blue-400/10 backdrop-blur-2xl px-8 py-10 mx-4 sm:mx-auto z-10">
        <div className="flex flex-col items-center mb-6">
          <span className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-blue-400 to-fuchsia-300 text-white rounded-full shadow-md mb-2">
            <RxAvatar size={38} />
          </span>
          <h2 className="text-3xl font-extrabold text-slate-800 text-center">
            Create Account
          </h2>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit} autoComplete="off">
          {/* NAME */}
          <div>
            <label htmlFor="name" className="block text-base font-semibold text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white/80 text-lg transition-all`}
              placeholder="Full name"
            />
            {errors.name && (
              <span className="text-red-500 text-xs">{errors.name}</span>
            )}
          </div>
          {/* EMAIL */}
          <div>
            <label htmlFor="email" className="block text-base font-semibold text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 bg-white/80 text-lg transition-all`}
              placeholder="Email"
            />
            {errors.email && (
              <span className="text-red-500 text-xs">{errors.email}</span>
            )}
          </div>
          {/* PASSWORD */}
          <div>
            <label htmlFor="password" className="block text-base font-semibold text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={visible ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-300 focus:border-fuchsia-300 bg-white/80 text-lg transition-all`}
                placeholder="Password"
              />
              {visible ? (
                <AiOutlineEye
                  className="absolute right-4 top-3 cursor-pointer text-xl text-gray-700"
                  onClick={() => setVisible(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute right-4 top-3 cursor-pointer text-xl text-gray-700"
                  onClick={() => setVisible(true)}
                />
              )}
            </div>
            {errors.password && (
              <span className="text-red-500 text-xs">{errors.password}</span>
            )}
          </div>
          {/* AVATAR */}
          <div>
            <label htmlFor="avatar" className="block text-base font-semibold text-gray-700">
              Profile Picture (optional)
            </label>
            <div className="mt-2 flex items-center gap-4">
              <span className="inline-block h-12 w-12 rounded-full overflow-hidden ring-2 ring-blue-400 bg-blue-50">
                {avatar ? (
                  <img
                    src={URL.createObjectURL(avatar)}
                    alt="avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <RxAvatar className="h-12 w-12 text-gray-400" />
                )}
              </span>
              <label
                htmlFor="file-input"
                className="flex items-center px-5 py-2 rounded-lg border border-gray-300 bg-white shadow-sm text-blue-600 font-semibold cursor-pointer hover:bg-blue-50 transition-all"
              >
                <span>Upload</span>
                <input
                  type="file"
                  name="avatar"
                  id="file-input"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileSubmit}
                  className="sr-only"
                />
              </label>
            </div>
          </div>
          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold shadow-lg bg-gradient-to-r from-blue-600 via-fuchsia-500 to-indigo-700 text-white text-lg mt-1 hover:scale-105 transition-transform
              ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
          {/* MSG */}
          {msg && (
            <div className={`text-center rounded-md px-2 py-2 mt-2 font-semibold 
                ${msg.startsWith("Signup successful") 
                  ? "bg-green-100 text-green-700 border border-green-300" 
                  : "bg-red-100 text-red-700 border border-red-300 animate-pulse"}`
                }>
              {msg}
            </div>
          )}
          <div className="flex justify-center items-center mt-2">
            <p className="text-gray-600 font-medium text-base">Already have an account?</p>
            <Link to="/login" className="ml-2 text-blue-600 font-bold underline hover:text-fuchsia-600 transition">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
