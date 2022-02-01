const express = require("express");
const cors = require("cors");

const app = express();
let message = "Hi owl";
let historicalRolls = [];

app.use(express.json());
app.use(cors());

app.get("/entries", (req, res) => {
  console.log("we got a request to see historicalRolls!");
  res.set("Access-Control-Allow-Origin", "*");

  res.json(historicalRolls);
});

app.post("/entries", (req, res) => {
  console.log("we got a new ENTRY");
  //console.log(req.body);
  entry = req.body;
  historicalRolls = [entry, ...historicalRolls];

  res.json(historicalRolls);
});

app.post("/newmessages", (req, res) => {
  console.log("we got a COMMENT");
  const { comment, id } = req.body;
  const indexedAt = historicalRolls.findIndex((x) => x.id === id);
  historicalRolls[indexedAt].comment = comment;
  res.json({ comment: comment + " <- your message received!" });
});

app.listen(5000, () => console.log(`we are listening to 5000`));
