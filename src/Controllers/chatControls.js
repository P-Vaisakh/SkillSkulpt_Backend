const chatModel = require("../Models/chatModel");
const chat = require("../Models/chatModel");

exports.createChat = async (req, res) => {
  const { senderId, receiverId } = req.body;
  const newChat = new chat({
    members: [senderId, receiverId],
  });
  try {
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.getUserChats = async (req, res) => {
  const { id } = req.params;
  try {
    const chats = await chat.find({members: { $in: [id] },});
    res.status(200).json(chats);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.findChat = async (req, res) => {
  const { fid, sid } = req.params;

  try {
    const chat = await chatModel.find({
      members: { $all: [fid, sid] },
    });
    res.status(200).json(chat);
  } catch (err) {
    res.status(400).json(err);
  }
};
