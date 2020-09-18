const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const tokens = require("../controllers/tokens");

const tokenExpiresIn = 1000 * 60 * 5;

module.exports = router;

router.post("/request", function(req, res) {
  users.auth(req.body.username, req.body.password).then(user => {
    if (user) {
      console.log("creating token!!");
      var t = tokens.create(user, tokenExpiresIn);
      var exp = new Date(Date.now() + tokenExpiresIn);
      res.json({ token: t, username: user.username, expires: exp }).send();
    } else {
      res.status(403).send("Authentication Failed.");
    }
  });
});

router.post("/refresh", function(req, res) {
  var t = tokens.check(req.body.token);
  if (t) {
    // token is valid.
    users.get(t.username).then(user => {
      if (user) {
        console.log("refreshing token!!");
        var t = tokens.create(user, tokenExpiresIn);
        var exp = new Date(Date.now() + tokenExpiresIn);
        res.json({ token: t, username: user.username, expires: exp }).send();
      } else {
        res.status(401).send("Token contains invalid payload.");
      }
    });
  } else {
    res.status(401).send("Token invalid.");
  }
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
