import express from "express";
import { updateProfileImage } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/update-profile-image", updateProfileImage);

export default userRouter;
