const users = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signupUser = async (req, res) => {
  const { userName, password, email, profilePic } = req.body;

  try {
    const user = await users.findOne({ email });

    if (user) {
      res.status(409).json("User already exists");
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new users({
        userName,
        password: hashedPassword,
        profilePic,
        email,
        rating: {
          rates: [],
          value: 0,
        },
      });
      await newUser.save();
      res.status(200).json(newUser);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await users.findOne({ email });
    if (!user) {
      res.status(404).json("User not found!");
    } else {
      const response = await bcrypt.compare(password, user.password);
      if (response) {
        const key = process.env.SECRET_KEY;
        const token = jwt.sign({ id: user._id }, key);
        res.status(200).json({ user, token });
      } else {
        res.status(401).json("Incorrect password");
      }
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.editProfile = async (req, res) => {
  const { userName, email, designation, link, profilePic, bio } = req.body;
  const { _id } = req.params;
  const img = req.file ? req.file.filename : profilePic;
  try {
    const user = await users.findById({ _id });
    if (user) {
      user.userName = userName;
      user.email = email;
      user.designation = designation;
      user.link = link;
      user.profilePic = img;
      user.bio = bio;
      user.rating = { uids: [], rates: [] };

      await user.save();
      res.status(200).json({ user });
    }
  } catch (err) {
    res.status(400).json("edit failed", err);
  }
};

exports.getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await users.findById({ _id: id });
    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(200).json("no user found");
    }
  } catch (err) {
    res.status(400).json("trouble finding user");
  }
};

exports.updateRating = async (req, res) => {
  const { id } = req.params;
  const { uid, rate } = req.body;

  try {
    const update = await users.findByIdAndUpdate(
      { _id: id },
      { $push: { "rating.rates": rate, "rating.uids": uid } }
    );
    res.status(200).json({update})
  } catch (err) {
    res.status(400).json(err);
  }
};
