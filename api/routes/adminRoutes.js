import express from "express";
import {
  getUsers,
  getUserById,
  editUser,
  editUserImage,
} from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/get-users", getUsers);
adminRouter.get("/get-user-by-id/:id", getUserById);
adminRouter.put("/edit-user", editUser);
adminRouter.put("/edit-user-image", editUserImage);

export default adminRouter;
