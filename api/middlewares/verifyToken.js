import jwt from "jsonwebtoken";
import { customError } from "../utils/error.js";
import Users from "../models/usersModel.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies["access_token"];
  jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
    if (err) {
      res.send(
        customError(403, "Invalid auth token. Please authenticate again")
      );
    } else {
      if (!req.user) {
        req.user = await Users.findById(decoded.id);
      }
      next();
    }
  });
};
