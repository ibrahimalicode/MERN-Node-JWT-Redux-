const jwt = require("jsonwebtoken");
const bycript = require("bcryptjs");
const { User } = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Plz fill the datas");
  }

  // check if the user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    console.log(userExists);
    throw new Error("User already exists!");
  }

  // hash the password
  const salt = await bycript.genSalt(10);
  const hashedPassword = await bycript.hash(password, salt);

  // create the user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  //return the value
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data!");
  }
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bycript.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials!");
  }
});

const getMe = asyncHandler(async (req, res) => {
  //res.json({ message: req.user });
  const { name, email, id } = await User.findById(req.user.id);
  res.json({ name, email, id });
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  userRegister,
  userLogin,
  getMe,
};
