const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      minLength: 2,
      maxLength: [30, "İsim en fazla 30 karakter olabilir!"],
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      minLength: 2,
      maxLength: [30, "Soyad en fazla 30 karakter olabilir!"],
      required: true,
    },
    avatar: {
      type: String,
      default: "default_avatar.png",
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
    },
    emailActive: {
      type: Boolean,
      default: false,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { collection: "users", timestamps: true, versionKey: false }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
