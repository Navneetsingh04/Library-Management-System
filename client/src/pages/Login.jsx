import React, { useState, useEffect } from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { login, resetSlice } from "../store/slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error, message, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleLogin = (e) => {
    e.preventDefault();
    const data = { email, password };
    dispatch(login(data));
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
  }, [dispatch, isAuthenticated, error, message, loading]);

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side */}
      <div className="w-full md:w-1/2 bg-white flex justify-center items-center p-8 relative">
        <div className="max-w-sm w-full flex flex-col items-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full flex items-center justify-center">
              <img src={logo} alt="logo" className="h-24 w-auto" />
            </div>
          </div>
          <h1 className="text-4xl font-medium text-center mb-4 overflow-hidden">
            Welcome Back !!
          </h1>
          <p className="text-gray-800 text-center mb-6">
            Please Enter your Credentials to Proceed
          </p>
          <form onSubmit={handleLogin} className="w-full">
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full border border-black rounded-md py-3 px-4 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full border border-black rounded-md py-3 px-4 focus:outline-none"
              />
            </div>
            <Link
              to={"/password/forgot"}
              className="font-semibold text-black mb-12"
            >
              forgot password?
            </Link>
            <div className="block md:hidden font-semibold mt-5">
              <p>
                New To our Platform?{" "}
                <Link
                  to={"/register"}
                  className="text-sm text-gray-500 hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
            <button
              type="submit"
              className="border-2 mt-5 border-black w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col justify-center items-center p-8 rounded-tl-[80px] rounded-bl-[80px]">
        <div className="text-center h-[400px]">
          <div className="flex justify-center items-center mb-12">
            <img
              src={logo_with_title}
              alt="logo"
              className="mb-12 h-44 w-auto"
            />
          </div>
          <p className="text-gray-300 mb-12">
            New to our Platform ? sign up now.
          </p>
          <Link
            to={"/register"}
            className="border-2 mt-5 border-white w-full font-semibold bg-black text-white px-8 py-2 rounded-lg hover:bg-white hover:text-black transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
