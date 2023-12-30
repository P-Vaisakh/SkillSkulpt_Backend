const messageModel = require("../Models/messageModel");

exports.postMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;

  const newMessage = new messageModel({
    chatId,
    senderId,
    text,
  });

  try {
    await newMessage.save();
    res.status(200).json({ newMessage });
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.getMessages = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await messageModel.find({ chatId: id });
    res.status(200).json({ result });
  } catch (err) {
    res.status(400).json(err);
  }
};
