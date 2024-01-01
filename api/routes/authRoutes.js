import express from "express";
import { signup, signin, googleSignin } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/sign-up", signup);
authRouter.post("/sign-in", signin);
authRouter.post("/google-sign-in", googleSignin);

export default authRouter;
