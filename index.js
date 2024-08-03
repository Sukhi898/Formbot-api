const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const UserRouter = require("./src/Router/Users");
const formRouter = require("./src/Router/Form");

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: ["https://form-bot-app.netlify.app"],
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(UserRouter);
app.use(formRouter);

app.get("/", (req, res) => {
  res.send("Hi Welcome to formbot API");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(process.env.MONGODB_URL);
  console.log(`Server is running on http://localhost:${port}`);
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB", err);
    });
});
