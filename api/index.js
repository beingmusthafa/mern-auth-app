import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected to mongodb"))
  .catch((error) => console.log(error));
const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((error, req, res, next) => {
  console.log(error);
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  res.status(statusCode).send({ success: false, message, statusCode });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
