const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const goalSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, "please ddd a text value"],
    },
    newItem: {
      type: String,
      required: [true, "please ddd a new Item value"],
    },
  },
  { timestamps: true }
);
const Goal = mongoose.model("Goal", goalSchema);

module.exports = {
  Goal,
};
