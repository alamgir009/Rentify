const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const { database } = require("./config/db.js");
const sellerRouter = require("./routes/seller.js");
const buyerRouter = require("./routes/buyer.js");

env.config();
const server = express();

//Middleware
server.use(cors());
server.use(express.json());

server.use("/", sellerRouter);
server.use("/", buyerRouter);

//Database connection
database();

//Server connection
server.listen(process.env.PORT, () => {
  console.log(`Server started at PORT: ${process.env.PORT}`);
});
