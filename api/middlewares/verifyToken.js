import jwt from "jsonwebtoken";
import { customError } from "../utils/error.js";
import Users from "../models/usersModel.js";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.send(customError(403, "Please authenticate"));
  }
  jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
    if (err) {
      res.send(
        customError(403, "Invalid auth token. Please authenticate again")
      );
    } else {
      if (!req.session.user) {
        req.session.user = await Users.findById(decoded.id);
      }
      next();
    }
  });
};
