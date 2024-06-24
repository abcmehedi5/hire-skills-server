const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const AuthModel = model("User", userSchema);

module.exports = { AuthModel };
