const express = require("express");
const router = express.Router();
const passport = require("../passport");
const Device = require("../models").Device;

module.exports = router;
// we use the passport to secure routes to authenticated users only.
router.get("/list", passport(), function(req, res) {
  Device.list().then(devices => {
    res.send(devices);
  });
});

router.post("/rename", passport(), function(req, res) {
  const id = req.body.id;
  const newName = req.body.name;
  Device.getByProgName(id).then(device => {
    console.log(req.body);
    device.rename(newName);
    res.send("ok");
  });
});
