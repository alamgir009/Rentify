const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: { type: String, unique: true, lowercase: true },
  phone: Number,
  password: String,
});

const BuyersModel = mongoose.model("buyers", buyerSchema);
module.exports = BuyersModel;
