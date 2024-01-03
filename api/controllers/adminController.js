import Users from "../models/usersModel.js";
import { customError } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const getUsers = async (req, res, next) => {
  const search = req.query.search || "";
  const regex = new RegExp(search, "i");
  try {
    const users = await Users.find({
      $or: [{ email: { $regex: regex } }, { username: { $regex: regex } }],
      _id: { $ne: req.user._id },
    }).select({ password: 0 });
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await Users.findById(id).select({ password: 0 });
    if (!user) return next(customError("User not found", 404));
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const editUser = async (req, res, next) => {
  const { newUsername, newEmail, userId } = req.body;
  try {
    const oldDetails = await Users.findById(userId).select({
      username: 1,
      email: 1,
    });
    if (newUsername === oldDetails.username && newEmail === oldDetails.email) {
      return next(customError(400, "Nothing to update"));
    }
    const usernameExists = await Users.findOne({ username: newUsername });
    if (usernameExists && newUsername != oldDetails.username)
      return next(customError(400, "Username already exists"));
    const emailExists = await Users.findOne({ email: newEmail });
    if (emailExists && newEmail != oldDetails.email)
      return next(customError(400, "Email already exists"));
    const newDetails = await Users.findByIdAndUpdate(
      userId,
      {
        username: newUsername,
        email: newEmail,
      },
      { new: true, projection: { password: 0 } }
    );
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      newDetails,
    });
  } catch (error) {
    next(error);
  }
};

export const editUserImage = async (req, res, next) => {
  const url = req.body.imageUrl;
  const userId = req.body.userId;
  console.log(url);
  try {
    const newDetails = await Users.findByIdAndUpdate(
      userId,
      {
        profileImage: url,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Profile pic updated successfully",
      newDetails,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    await Users.findByIdAndDelete(userId);
    res
      .status(200)
      .json({ success: true, message: "Account deleted successfully!" });
  } catch (error) {
    next(error);
  }
};
