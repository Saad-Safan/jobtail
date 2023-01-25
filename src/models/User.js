const mongoose = require("mongoose");

const JobSchema = mongoose.Schema({
  jobId: { type: String },
  company: { type: String },
  title: { type: String },
  description: { type: String },
  status: { type: String },
  date: { type: Date, default: Date.now },
});

const UserSchema = mongoose.Schema({
  user: { type: String },
  jobs: [JobSchema],
});

module.exports = mongoose.model("UserJobs", UserSchema);
