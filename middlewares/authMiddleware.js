const User = require("../models.js");

async function authMiddleware(req, res, next) {
  if (req.path === "/login" || req.path === "/signup") {
    next();
  } else {
    try {
      let user = await User.findOne({ username: req.cookies["username"] });
      if (user && user.isLoggedIn) {
        req.user = user;
        next();
      } else {
        res.redirect("/login");
      }
    } catch (error) {
      res.status(500).send("Authentication error: " + error.message);
    }
  }
}

module.exports = authMiddleware;
