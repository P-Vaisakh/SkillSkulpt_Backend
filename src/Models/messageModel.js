const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"chats"
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  text: {
    type: String,
  },
},{timestamps:true});

const message= mongoose.model("messages", messageSchema)
module.exports=message
