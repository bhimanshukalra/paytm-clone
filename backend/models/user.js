const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 3,
      maxLength: 30,
      lowercase: true,
    },
    firstName: { type: String, required: true, trim: true, maxLength: 50 },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    password: { type: String, required: true, trim: true, minLength: 6 },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
