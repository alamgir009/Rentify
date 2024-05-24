const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
const SellersModel = require("../models/sellers");

env.config();

//Register Sellers
const sellerRegister = async (req, res) => {
  try {
    const {
      fristname,
      lastname,
      email,
      phone,
      password,
      address,
      number_of_bedrooms,
      number_of_bathrooms,
      nearby_hospitals,
      nearby_colleges,
      number_of_likes,
      property_image_link,
    } = req.body;

    const user = await SellersModel.findOne({ email });
    if (!user) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const newSeller = new SellersModel({
        fristname,
        lastname,
        email,
        phone,
        password: hashedPassword,
        address,
        number_of_bedrooms,
        number_of_bathrooms,
        nearby_hospitals,
        nearby_colleges,
        number_of_likes,
        property_image_link,
      });

      await newSeller.save();
      return res.status(201).json(newSeller);
    } else {
      return res.status(403).json({ message: "User Already Exists" });
    }
  } catch (error) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

// Seller Sign in
const sellerSignin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await SellersModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Seller not registered!" });
    }

    const verifyPassword = await bcrypt.compare(password, user.password); // Await the compare function

    if (!verifyPassword) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const token = jwt.sign({ id: user._id }, process.env.KEY);
    res.cookie("authToken", token, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({ message: "Signin Successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

//Get all Seller
const sellers = async (req, res) => {
  const seller = await SellersModel.find();
  return res.status(200).json(seller);
};

module.exports = {
  sellerRegister,
  sellerSignin,
  sellers,
};
