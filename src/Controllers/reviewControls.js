const reviews = require("../Models/userReviewModel");

exports.postReview = async (req, res) => {
  const { title, val, author, about } = req.body;
  try {
    const review = new reviews({
      title,
      val,
      author,
      about,
    });
    await review.save();
    res.status(200).json({ review });
  } catch (err) {
    res.status(400).json("Something went wrong");
  }
};

exports.getReviews = async (req, res) => {
  const { id } = req.params;
  try {
    const revs = await reviews
      .find({ about: id })
      .populate("author", "userName profilePic");
    if (revs) {
      res.status(200).json({ reviews: revs });
    } else {
      res.status(400).json("could not find any reviews");
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
