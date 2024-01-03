import express from "express";
import {
  updateProfileImage,
  updateProfile,
  changePassword,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/update-profile-image", updateProfileImage);
userRouter.post("/update-profile", updateProfile);
userRouter.post("/change-password", changePassword);

export default userRouter;
