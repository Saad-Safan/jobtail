require("dotenv").config();

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}/test?retryWrites=true&w=majority`;
mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
  },
  () => {
    console.log("Connected to DB");
  }
);

// ROUTES
const jobsRoute = require("../routes/jobs");

// Middleware
app.use(bodyParser.json());
app.use("/api/jobs", jobsRoute);

// To start listening to requests on port 3000
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
