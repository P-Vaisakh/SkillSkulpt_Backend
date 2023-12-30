const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    required: true,
    type: String,
    default: "img-1703480081756-anonymous-avatar-icon-25.jpg",
  },
  designation: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  link: {
    type: String,
    default: "",
  },
  rating: {
    uids: {
      type: [String], 
      default: [],
    },
    rates: {
      type: [Number], 
      default: [],
    },
  },
});

const users = mongoose.model("users", userSchema);

module.exports = users;
