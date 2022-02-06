const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Users } = require("../Users");

function authRoutes(app, user) {
  app.post("/users", async (req, res) => {
    console.log("adding a user");
    res.send(user.create(req.body));
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
        jwtinfo = { email: user.email };
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
