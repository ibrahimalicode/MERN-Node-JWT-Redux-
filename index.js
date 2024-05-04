const express = require("express");
const dotenv = require("dotenv").config();
const database = require("./config/db");
const { errorModdleware } = require("./middleware/errorMiddleware");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

//middleware
app.use(errorModdleware);

database
  .then(() => {
    console.log("connected..");
    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log(`app listing on port ${port}`));
  })
  .catch((err) => console.log(err, " : err"));
