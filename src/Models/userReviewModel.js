const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  val: {
    required: true,
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"users",
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
});

const reviews = mongoose.model("reviews", reviewSchema);

module.exports = reviews;
