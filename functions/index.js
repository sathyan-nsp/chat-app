const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("../Routes/userRoute");
const chatRoute = require("../Routes/chatRoute");
const messageRoute = require("../Routes/messageRoute");

const app = express();
const router = express.Router();

require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

app.get("/", (req, res) => {
  res.send("Welcome to our chat APIs");
});

app.post("/", (req, res) => {});

app.get("/", (req, res) => {
  res.send("App is running..");
});

app.use("/.netlify/functions/index", router);

const port = process.env.PORT || 5000;

app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`);
});

mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => console.log("MongoDB Connection established"))
  .catch((error) => console.log("MongoDB Connection Failed: ", error.message));

module.exports.handler = serverless(app);
