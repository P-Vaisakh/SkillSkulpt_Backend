const requests = require("../Models/reqModel");

exports.postRequest = async (req, res) => {
  const { title, category, reward, user } = req.body;
  try {
    const newRequest = new requests({
      title,
      category,
      reward,
      user,
    });
    const request = await newRequest.save();
    res.status(200).json({ request });
  } catch (err) {
    res.status(400).json("something went wrong, please try again", err);
  }
};

exports.getPosts = async (req, res) => {
  try {
    const reqs = await requests
      .find({})
      .populate("user", "userName profilePic");
    res.status(200).json({ reqs });
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.getUserRequests = async (req, res) => {
  const { _id } = req.params;
  try {
    const userRequests = await requests
      .find({ user: _id })
      .populate("user", "userName profilePic");
    if (userRequests) {
      res.status(200).json({ userRequests });
    } else {
      res.status(200).json("You have posted no requests");
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteRequest = async (req, res) => {
  const { _id } = req.params;
  try {
    const result = await requests.deleteOne({ _id });
    if (result) {
      res.status(200).json({ result });
    }
  } catch (err) {
    res.status(400).json("Deleting request failed, Please try again");
  }
};
