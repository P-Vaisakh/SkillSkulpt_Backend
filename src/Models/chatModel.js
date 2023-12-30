const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    members: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const chatModel = mongoose.model("chats", chatSchema);

module.exports = chatModel;
