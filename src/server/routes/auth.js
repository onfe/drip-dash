const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const tokens = require("../controllers/tokens");

module.exports = router;

router.post("/request", function(req, res) {
  users.auth(req.body.username, req.body.password).then(user => {
    if (user) {
      console.log("creating token!!");
      var t = tokens.create(user);
      res.json({ token: t, username: user.username }).send();
    } else {
      res.status(403).send("Authentication Failed.");
    }
  });
});

router.get("/reqres", function(req, res) {
  users.exists().then(exist => {
    res.send(!exist);
  });
});

router.post("/create", function(req, res) {
  users.exists().then(exist => {
    if (exist) {
      // a user already exists, prevent registration.
      res.status(403).send("A user is already registered. Please log in.");
    } else {
      users.create(req.body.username, req.body.password).then(() => {
        res.send("User created.");
      });
    }
  });
});
