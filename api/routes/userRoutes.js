import express from "express";
import {
  updateProfileImage,
  updateProfile,
  changePassword,
  deleteAccount,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/update-profile-image", updateProfileImage);
userRouter.post("/update-profile", updateProfile);
userRouter.post("/change-password", changePassword);
userRouter.delete("/delete-account", deleteAccount);

export default userRouter;
