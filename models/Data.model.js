const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const dataSchema = new Schema({
  type: String,
  category: String,
  subCategory: String,
  value: Number,
  year: Number,
  month: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Data = model("Data", dataSchema);

module.exports = Data;
