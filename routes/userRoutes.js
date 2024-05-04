const express = require("express");
const route = express.Router();
const {
  userRegister,
  userLogin,
  getMe,
} = require("../controllers/usersController");
const { protect } = require("../middleware/authMiddleware");

route.route("/register").post(userRegister);
route.route("/login").post(userLogin);
route.route("/me").get(protect, getMe);

module.exports = route;
