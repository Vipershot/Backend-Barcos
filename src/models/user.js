const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    userName: {
      type: String,
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
    role: {
      type: ["user", "userService", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true /* TODO createAt, updateAt */,
    versionKey: false,
  }
);

module.exports = mongoose.model("userShip", UserScheme);
