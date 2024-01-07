const { Goal } = require("../models/goalModels");
const asyncHandler = require("express-async-handler");

const getGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.find();

  res.status(200).json(goal);
});

const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text || !req.body.newItem) {
    res.status(400);
    throw new Error("plz enter the text");
  }

  try {
    const newGoal = await Goal.create({
      text: req.body.text,
      newItem: req.body.newItem,
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
  const DElETEGOAL = await Goal.findByIdAndDelete(req.params.id);

  if (!DElETEGOAL) {
    res.status(400);
    throw new Error("DELETE GOAL UNSECCESSFUL");
  }

  res.status(200).json(DElETEGOAL);
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
