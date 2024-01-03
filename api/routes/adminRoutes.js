import express from "express";
import {
  getUsers,
  getUserById,
  editUser,
  editUserImage,
  deleteUserById,
} from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/get-users", getUsers);
adminRouter.get("/get-user-by-id/:id", getUserById);
adminRouter.put("/edit-user", editUser);
adminRouter.put("/edit-user-image", editUserImage);
adminRouter.delete("/delete-user/:id", deleteUserById);
export default adminRouter;
