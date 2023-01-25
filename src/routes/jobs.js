const express = require("express");
const { restart } = require("nodemon");
const router = express.Router();
const UserJobs = require("../models/User");

router.get(`/getAll`, async (req, res) => {
  try {
    const users = await UserJobs.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get(`/getOne/:user`, async (req, res) => {
  try {
    // find by user
    const user = await UserJobs.find({ user: req.params.user });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post("/addUser", async (req, res) => {
  const userJob = new UserJobs({
    user: req.body.user,
    jobs: req.body.jobs,
  });

  try {
    const savedPost = await userJob.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/addJob/:user", async (req, res) => {
  // find by user and update
  const userJob = await UserJobs.findOneAndUpdate(
    { user: req.params.user },
    { $push: { jobs: req.body.jobs } }
  );
  // save
  try {
    const savedPost = await userJob[0].save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
