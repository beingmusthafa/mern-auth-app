import Users from "../models/usersModel.js";
import { customError } from "../utils/error.js";

export const updateProfileImage = async (req, res, next) => {
  const url = req.body.imageUrl;
  console.log(url);
  console.log(req.session.user);
  try {
    const newDetails = await Users.findByIdAndUpdate(req.session.user._id, {
      profileImage: url,
    });
    res.status(200).json({
      success: true,
      message: "Profile pic updated successfully",
      newDetails,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  const { newUsername, newEmail } = req.body;
  try {
    if (
      newUsername === req.session.user.username &&
      newEmail === req.session.user.email
    ) {
      return next(customError(400, "Nothing to update"));
    }
    const usernameExists = await Users.findOne({ username: newUsername });
    if (usernameExists && newUsername != req.session.user.username)
      return next(customError(400, "Username already exists"));
    const emailExists = await Users.findOne({ email: newEmail });
    if (emailExists && newEmail != req.session.user.email)
      return next(customError(400, "Email already exists"));
    const newDetails = await Users.findByIdAndUpdate(
      req.session.user._id,
      {
        username: newUsername,
        email: newEmail,
      },
      { new: true, projection: { password: 0 } }
    );
    req.session.user = newDetails;
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      newDetails,
    });
  } catch (error) {
    next(error);
  }
};
