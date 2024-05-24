const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: { type: String, unique: true, lowercase: true },
  phone: Number,
  password: String,
  address: String,
  number_of_bedrooms: Number,
  number_of_bathrooms: Number,
  nearby_hospitals: Number,
  nearby_colleges: Number,
  number_of_likes: Number,
  property_image_link: String,
});

const SellersModel = mongoose.model("sellers", sellerSchema);
module.exports = SellersModel;
