const { Goal } = require("../models/goalModels");
const asyncHandler = require("express-async-handler");
const { User } = require("../models/userModel");

const getGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.find({ user: req.user.id });

  res.status(200).json(goal);
});

const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("plz enter the text");
  }

  try {
    const newGoal = await Goal.create({
      text: req.body.text,
      user: req.user.id,
    });
    res.status(200).json(newGoal);
  } catch (err) {
    console.log(err, "errrrr");
  }
});

const updateGoal = asyncHandler(async (req, res) => {
  if (!req.params.id || !req.body.text) {
    res.status(400);
    throw new Error("Id not found form the params");
  }

  const goal = await Goal.findById(req.params.id);

  // check if tthe req is from a user
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(400);
    throw new Error("Not a user");
  }

  //check if the user matchs to the goal
  if (goal.user.toString() !== user.id) {
    res.status(400);
    throw new Error("Not authorized");
  }

  const updateGoal = await Goal.findByIdAndUpdate(
    req.params.id,
    { text: req.body.text }, // and the order matters // or u can put the req.body as an object
    { new: true } // here is to return the new data instead of the original one
  );

  if (!updateGoal) {
    res.status(400);
    throw new Error("UPDATE NOT FOUND !!");
  }

  res.status(200).json(updateGoal);
});

const deleteGoal = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400);
    throw new Error("Could not delete the file Plz the ID");
  }

  const goal = await Goal.findById(req.params.id);

  // check if tthe req is from a user
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(400);
    throw new Error("Not a user");
  }

  //check if the user matchs to the goal
  if (goal.user.toString() !== user.id) {
    res.status(400);
    throw new Error("Not authorized");
  }

  const DElETEGOAL = await Goal.findByIdAndDelete(req.params.id);

  if (!DElETEGOAL) {
    res.status(400);
    throw new Error("DELETE GOAL UNSECCESSFUL");
  }

  res.status(200).json(DElETEGOAL.id);
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
