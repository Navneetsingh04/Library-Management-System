import { app } from "./app.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"; // ✅ Required

dotenv.config();

// Use cookie-parser to read cookies from request headers
app.use(cookieParser()); // ✅ MUST BE ADDED before routes

// Configure CORS to allow frontend requests
app.use(
  cors({
    origin: "ttps://bookworm-library.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
