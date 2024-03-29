import Users from "../models/usersModel.js";
import { customError } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    if (await Users.exists({ email })) {
      return next(customError(400, "Email already exists!"));
    }
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);
    await new Users({ username, email, password: hashedPassword }).save();
    res
      .status(201)
      .send({ success: true, message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  const existingUser = await Users.findOne({ email });
  if (!existingUser) return next(customError(400, "User does not exist!"));
  if (!bcryptjs.compareSync(password, existingUser.password)) {
    return next(customError(400, "Incorrect password!"));
  }
  const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
  const { password: hashedPassword, ...rest } = existingUser._doc;
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user: rest,
    token,
  });
};

export const googleSignin = async (req, res, next) => {
  const { name, email, imageUrl } = req.body;
  const existingUser = await Users.findOne({ email });
  if (existingUser) {
    const token = jwt.sign({ id: existingUser?._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = existingUser?._doc;
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: rest,
      token,
    });
  } else {
    const salt = bcryptjs.genSaltSync(10);
    const generatedPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = bcryptjs.hashSync(generatedPassword, salt);
    const generatedUsername =
      name.split(" ").join("").toLowerCase() +
      Math.floor(Math.random() * 1000).toString();
    const newUser = new Users({
      username: generatedUsername,
      email,
      password: hashedPassword,
      profileImage: imageUrl,
      externalAuth: true,
    });
    newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword2, ...rest } = newUser._doc;
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: rest,
      token,
    });
  }
};

export const signOut = async (req, res, next) => {
  try {
    req.session.user = null;
    res.status(200).json({ success: true, message: "User signed out!" });
  } catch (error) {
    next(error);
  }
};
