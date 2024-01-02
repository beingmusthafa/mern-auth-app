import express from "express";
import {
  updateProfileImage,
  updateProfile,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/update-profile-image", updateProfileImage);
userRouter.post("/update-profile", updateProfile);

export default userRouter;
