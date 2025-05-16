import React, { useState, useEffect } from "react";
import logo_with_title from "../assets/logo-with-title.png";
import logo from "../assets/black-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Navigate, Link } from "react-router-dom";
import { forgotPassword, resetSlice } from "../store/slices/authSlice";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { loading, error, message, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleForgotPassword = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetSlice());
    }
  }, [dispatch, error, message]);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side */}
      <div className="hidden md:flex md:w-1/2 bg-black text-white flex-col justify-center items-center p-8 rounded-tr-[80px] rounded-br-[80px]">
        <img
          src={logo_with_title}
          alt="logo"
          className="h-44 w-auto mb-12"
        />
        <h2 className="text-3xl font-bold">Forgot your password?</h2>
        <p className="mt-4 text-sm text-gray-300 px-12 text-center">
          Enter your registered email address and we'll send you a link to
          reset your password.
        </p>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-12 relative">
        <Link
          to="/login"
          className="absolute top-6 left-6 border-2 border-black rounded-full px-5 py-2 text-sm font-semibold hover:bg-black hover:text-white transition"
        >
          Back
        </Link>

        <div className="w-full max-w-sm mt-12 md:mt-0">
          <div className="flex justify-center mb-10">
            <img src={logo} alt="logo" className="h-20 w-auto" />
          </div>

          <h1 className="text-3xl font-semibold text-center mb-4">
            Forgot Password
          </h1>
          <p className="text-gray-700 text-center mb-8">
            Please enter your email
          </p>

          <form onSubmit={handleForgotPassword} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-4 "
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md text-white font-medium transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-white hover:text-black border-2 border-black"
              }`}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
