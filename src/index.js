require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDB = require("./DB/connection");
const routes = require("./Routes/routes");
const path=require("path")

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

connectToDB();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(5000, () => {
  console.log("server started at 5000");
});
