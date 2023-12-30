const appReviews = require("../Models/appReviewModel");

exports.postAppReview = async (req, res) => {
  const { id } = req.params;

  const { review } = req.body;
  try {
    const newReview = new appReviews({ uid: id, review });
    await newReview.save();
    res.status(200).json({ newReview });
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.getAppReviews = async (req, res) => {
  try {
    const reviews = await appReviews
      .find({})
      .populate("uid", "userName designation profilePic");
    res.status(200).json({ reviews });
  } catch (err) {
    res.status(400).json(err);
  }
};
