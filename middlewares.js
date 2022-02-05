const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next, users) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(req.headers);
  if (token == null) return res.send("411 no token found buddy");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, jwtinfo) => {
    if (err) return res.send("403, you have a token, but it's wrong token");
    req.user = users.find((user) => user.email === jwtinfo.email);
    next();
  });
}
module.exports = { authenticateToken };
