const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "please tell us your name!"],
    },
    email: {
      type: String,
      required: [true, "please provide  your email!"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "please provide a valid email!"],
    },
    photo: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "please provide  a password"],
      minlength: 8,
      select:false
    },
    confirmPassword: {
      type: String,
      required: [true, "please confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "passwords are not the same",
      },
    },
  },
  { timestamp: true }
);

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.confirmPassword = undefined;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
