const express = require("express");
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;

const app = express();
app.use(express.json());
app.use(cors());

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/roll10db";
let db;

const MONGODB_URI = process.env.MONGODB_URI || url;

MongoClient.connect(MONGODB_URI, function (err, database) {
  if (err) throw err;
  db = database.db("roll10db");
});

app.get("/entries", async (req, res) => {
  console.log("we got a request to see historicalRolls!");

  let historicalRollsDb = await db
    .collection("historicalRolls")
    .find({})
    .sort({ _id: -1 })
    .toArray();
  res.json(historicalRollsDb);
});

app.delete("/entries", async (req, res) => {
  console.log("we are deleting the whole database!");
  const deleteObject = await db
    .collection(req.body.collectionToDelete)
    .deleteMany({});
  res.json(deleteObject);
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

app.post("/newcomment", async (req, res) => {
  console.log("we got a request to edit a comment!");
  const { comment, _id } = req.body;

  await db
    .collection("historicalRolls")
    .updateOne({ _id: ObjectId(_id) }, { $set: { comment } });

  let insertedCommentEntry = await db
    .collection("historicalRolls")
    .findOne({ _id: ObjectId(_id) });

  res.json(insertedCommentEntry);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`we are listening to ${PORT}`));
