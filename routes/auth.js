const bcrypt = require("bcrypt");
const { response } = require("express");
const jwt = require("jsonwebtoken");

function authRoutes(app, users) {
  app.post("/users/signup", async (req, res) => {
    console.log("adding a user");
    const data = await users.create(req.body);
    const accessToken = jwt.sign(
      { _id: data._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "10 minutes",
      }
    );
    res.send({ name: data.name, accessToken });
  });

  app.post("/users/login", async (req, res) => {
    const user = users.find((user) => user.email === req.body.email);
    if (user == null) {
      return res.status(400).send("Cannot find user");
    }
    try {
      if (await bcrypt.compare(req.body.password, user.password)) {
        console.log("got a match, one sec");
        console.log(user.email, process.env.ACCESS_TOKEN_SECRET);
        jwtinfo = { _id: user._id };
        const accessToken = jwt.sign(jwtinfo, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "60s",
        });
        res.send({ accessToken });
      } else {
        res.send("Problem loggin you in...");
      }
    } catch {
      res.status(500).send("Buggy");
    }
  });
}

module.exports = { authRoutes };
