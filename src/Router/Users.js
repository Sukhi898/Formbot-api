const express = require("express");
const router = express.Router();
const {
  createUser,
  createLogin,
  updateUserDetails,
  getuser,
} = require("../Controllers/Users");

router.post("/register", createUser);
router.post("/login", createLogin);
router.put("/update/:id", updateUserDetails);
router.get("/users", getuser);

module.exports = router;
