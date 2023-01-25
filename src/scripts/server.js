require("dotenv").config();

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

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
// Allow access from any origin
var corsOptions = {
  origin: ["http://localhost:4200", "http://127.0.0.1:4200"],
};
app.use(cors(corsOptions));

// To start listening to requests on port 3000
port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
