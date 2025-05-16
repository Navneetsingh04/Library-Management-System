import { catchAsyncErrors } from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "./errorMiddlewares.js";
import { User } from "../models/userModel.js";

// Middleware to check if user is authenticated
export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("User is not authenticated", 401));
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    return next(new ErrorHandler("Invalid or expired token", 401));
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new ErrorHandler("User no longer exists", 401));
  }

  req.user = user;
  next();
});

// Middleware to check if user is authorized (role-based)
export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not authorized to access this resource`,
          403
        )
      );
    }
    next();
  };
};
