const mongoose = require("mongoose");

const appReviewSchema = new mongoose.Schema({
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"users"
  },
  review: {
    type: String,
    required: true,
  },
});

const appReviews = mongoose.model("appReviews", appReviewSchema);
module.exports = appReviews;
