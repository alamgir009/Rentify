const mongoose = require("mongoose");
const env = require("dotenv");
env.config();

module.exports.database = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connection successful.");
  } catch (error) {
    console.error({ error: "Something went wrong to the database connection" });
  }
};
