import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./database/db.js";
import { errorMiddleware } from "./middlewares/errorMiddlewares.js";
import authRouter from "./routes/authRouter.js";
import bookRouter from "./routes/bookRouter.js";
import borrowRouter from "./routes/borrowRouter.js";
import userRouter from "./routes/userRouter.js";
import expressFileUpload from "express-fileupload";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { notifyUsers } from "./services/notifyUsers.js";
import { removeUnverifiedAccounts } from "./services/removeUnverifiedAccounts.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

config({ path: "./config/config.env" }); 
app.use(
  cors({
    origin: "https://bookworm-library.vercel.app",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const tempDir = path.join(__dirname, "uploads/tmp");

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

app.use(
  expressFileUpload({
    useTempFiles: true,
    tempFileDir: tempDir,
  })
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/borrow", borrowRouter);
app.use("/api/v1/user", userRouter);
notifyUsers();
removeUnverifiedAccounts();
connectDB();
app.use(errorMiddleware);
