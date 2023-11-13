const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const dataSchema = new Schema({
  type: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  value: { type: Number, required: true },
  year: { type: Number, required: true },
  month: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Data = model("Data", dataSchema);

module.exports = Data;
