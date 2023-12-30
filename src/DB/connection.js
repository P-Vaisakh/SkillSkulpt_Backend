const mongoose = require("mongoose");

const connectToDB = async () => {
  const connString = process.env.MONGO;
  try {
    const connection = await mongoose.connect(connString);
    console.log("Mongodb connected:", connection.connection.host);
  } catch (err) {
    console.log("connection failed----", err);
  }
}
module.exports=connectToDB