const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    data: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Data",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// CAPITALIZE FIRST LETTER OF NAME
userSchema.pre("save", function (next) {
  this.firstName = capitalizeFirstLetter(this.firstName);
  this.lastName = capitalizeFirstLetter(this.lastName);
  next();
});

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const User = model("User", userSchema);

module.exports = User;
