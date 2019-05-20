const express = require('express');
const router = express.Router()
const users = require('../controllers/users')
const tokens = require('../controllers/tokens')


module.exports = router

router.post('/request', function (req, res) {
  users.createDefault();
  users.auth(req.body.username, req.body.password).then( user => {
    if (user) {
      console.log("creating token!!")
      var t = tokens.create(user);
      res.json({ token: t, username: user.username }).send()
    } else {
      res.status(403).send("Authentication Failed.")
    }
  });
});
