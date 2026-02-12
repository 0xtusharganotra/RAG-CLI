import express from "express";
import { ChatBot } from "./chatbot.js";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/chat", async (req, res) => {
  const message = req.body.message;
  const data = await ChatBot(message);

  res.json({
    bot_message: data,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
