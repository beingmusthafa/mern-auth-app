import express from "express";
import { signup } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/sign-up", signup);

export default authRouter;
