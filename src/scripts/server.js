require("dotenv").config();

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongo = require("mongoose");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}/test?retryWrites=true&w=majority`;
var database = new MongoClient(uri);
await database.connect();

var app = express();
app.use(bodyParser);
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "localhost:4200");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

var Schema = mongo.Schema;

var UsersSchema = new Schema({
  user: { type: String },
});
