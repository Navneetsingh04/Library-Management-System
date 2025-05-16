import express from 'express';
import { getAllUsers, registerNewAdmin } from '../controllers/userController.js';

import { isAuthenticated,isAuthorized } from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

userRouter.get("/all", isAuthenticated, isAuthorized("Admin"), getAllUsers);
userRouter.post("/add/new-admin", isAuthenticated, isAuthorized("Admin"),  registerNewAdmin);

export default userRouter;