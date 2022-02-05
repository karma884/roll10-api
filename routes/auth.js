const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function authRoutes(app, users) {
  app.post("/users", async (req, res) => {
    console.log("adding a user");
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = {
        email: req.body.email,
        name: req.body.name,
        password: hashedPassword,
        unhashedpw: req.body.password,
      };
      users.push(user);
      res.status(263).send();
    } catch {
      res.status(566).send();
    }
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
