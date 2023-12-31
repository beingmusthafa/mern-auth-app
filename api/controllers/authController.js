import Users from "../models/usersModel.js";
import { customError } from "../utils/error.js";
import bcryptjs from "bcryptjs";
export const signup = async (req, res, next) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  try {
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);
    await new Users({ username, email, password: hashedPassword }).save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};
