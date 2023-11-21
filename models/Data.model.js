const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const dataSchema = new Schema({
  type: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  value: { type: Number, required: true },
  currency: { type: String, required: true },
  date: { type: Date, required: true },
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Data = model("Data", dataSchema);

module.exports = Data;
