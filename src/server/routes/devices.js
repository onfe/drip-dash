const express = require("express");
const router = express.Router();
const passport = require("../passport");
const Device = require("../models").Device;

module.exports = router;
// we use the passport to secure routes to authenticated users only.
router.get("/list", passport(), function(req, res) {
  Device.list().then(devices => {
    console.log(devices);
    res.send(devices);
  });
});
