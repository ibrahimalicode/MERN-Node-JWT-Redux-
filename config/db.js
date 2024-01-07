const mongoose = require("mongoose");

const database = mongoose.connect(process.env.MONGO_API);
module.exports = database;
