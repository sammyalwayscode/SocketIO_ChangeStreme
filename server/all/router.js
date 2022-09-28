const express = require("express");
const router = express.Router();
const userModel = require("./userModel");
const likeModel = require("./likeModel");
const { default: mongoose } = require("mongoose");

router.get("/", async (req, res) => {
  const user = await userModel.find();
  res.json({
    message: "User Gotten",
    data: user,
  });
});
router.post("/create", async (req, res) => {
  const user = await userModel.create(req.body);
  res.json({
    message: "Created",
    data: user,
  });
});
router.post("/:id/like", async (req, res) => {
  const getUser = await userModel.findById(req.params.id);
  const createLike = new likeModel({ user: req.params.id });

  createLike.user = getUser;
  createLike.save();

  getUser.like.push(mongoose.Types.ObjectId(createLike._id));
  getUser.save();

  res.json({
    message: "Likede",
    data: createLike,
  });
});

module.exports = router;
