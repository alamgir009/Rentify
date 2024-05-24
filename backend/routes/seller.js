const express = require("express");
const {
  sellerRegister,
  sellerSignin,
  sellers,
} = require("../controllers/seller");

const router = express.Router();

router.post("/register", sellerRegister);
router.get("/sellers", sellers);
router.post("/signin", sellerSignin);
// router.patch("/update:id", sellerUpdate);
// router.post("/signout", sellerSignOut);
// router.delete("/delete:id", sellerDelete);

module.exports = router;
