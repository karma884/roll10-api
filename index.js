const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/roll10db";
let db;

MongoClient.connect(url, function (err, database) {
  if (err) throw err;
  db = database.db("roll10db");
});

app.get("/entries", async (req, res) => {
  console.log("we got a request to see historicalRolls!");

  let historicalRollsDb = await db
    .collection("historicalRolls")
    .find({})
    .toArray();
  res.json(historicalRollsDb);
});

app.post("/entries", async (req, res) => {
  console.log("we got a new entry!");
  entry = req.body;
  const { insertedId } = await db
    .collection("historicalRolls")
    .insertOne(entry);

  let insertedEntry = await db
    .collection("historicalRolls")
    .findOne({ _id: insertedId });
  res.json(insertedEntry);
});

app.post("/newmessages", (req, res) => {
  console.log("we got a request to edit a comment!");
  const { comment, id } = req.body;
  db.collection("historicalRolls").updateOne(
    { _id: id },
    { comment },
    function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
    }
  );
  res.json({ comment: comment + " <- your message received!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`we are listening to ${PORT}`));
