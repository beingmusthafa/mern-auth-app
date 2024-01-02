import Users from "../models/usersModel.js";
import { customError } from "../utils/error.js";

export const updateProfileImage = async (req, res, next) => {
  const url = req.body.imageUrl;
  console.log(url);
  console.log(req.session.user);
  try {
    await Users.findByIdAndUpdate(req.session.user._id, { profileImage: url });
    res
      .status(200)
      .json({ success: true, message: "Profile pic updated successfully" });
  } catch (error) {
    next(error);
  }
};
