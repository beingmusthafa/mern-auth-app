import mongoose from "mongoose";

const usersSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      unique: true,
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", usersSchema);
export default Users;
