import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { resetPassword, resetSlice } from "../store/slices/authSlice";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { token } = useParams();
  const dispatch = useDispatch();
  const { loading, error, message, isAuthenticated } = useSelector((state) => state.auth);

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
  
    if (password.length < 8 || password.length > 20) {
      toast.error("Password must be between 8 and 20 characters");
      return;
    }
    const formData = new FormData();
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
  
    // console.log("Sending data:", data);
    // console.log("Token:", token);

    dispatch(resetPassword(formData, token));
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
  }, [dispatch, message, error]);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col justify-center md:flex-row h-screen">
      {/* Left Section */}
      <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col justify-center items-center p-8 rounded-tr-[80px] rounded-br-[80px]">
        <div className="text-center h-[376px]">
          <div className="flex justify-center items-center mb-12">
            <img src={logo_with_title} alt="logo" className="mb-12 h-44 w-auto" />
          </div>
          <h2 className="text-2xl font-bold justify-center">Reset your password</h2>
          <p className="mt-4 text-sm text-gray-300">Enter your new password below.</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 py-12 relative">
        <Link
          to="/password/forgot"
          className="border-2 rounded-3xl border-black font-bold w-52 py-2 px-4 absolute top-10 left-10 hover:bg-black hover:text-white transition duration-300"
        >
          Back
        </Link>

        <div className="max-w-sm w-full flex flex-col items-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full flex items-center justify-center">
              <img src={logo} alt="logo" className="h-24 w-auto" />
            </div>
          </div>
          <h1 className="text-4xl font-medium text-center mb-5 overflow-hidden">Reset Password</h1>
          <p className="text-gray-800 text-center mb-6">Please enter your new password</p>

          <form onSubmit={handleResetPassword} className="w-full">
            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password"
                required
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`bg-black text-white font-semibold py-2 px-4 rounded-lg w-full ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Loading..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
