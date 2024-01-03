import express from "express";
import {
  getUsers,
  getUserById,
  editUser,
} from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/get-users", getUsers);
adminRouter.get("/get-user-by-id/:id", getUserById);
adminRouter.put("/edit-user", editUser);

export default adminRouter;
