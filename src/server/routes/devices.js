const express = require("express");
const router = express.Router();
const passport = require("../passport");
const Device = require("../models").Device;
const Data = require("../models").Data;

module.exports = router;
// we use the passport to secure routes to authenticated users only.
router.get("/", passport(), function(req, res) {
  Device.list().then(devices => {
    res.send(devices);
  });
});

router.post("/:id/rename", passport(), function(req, res) {
  const id = req.params.id;
  const newName = req.body.name || "";
  Device.get(id).then(device => {
    device.rename(newName);
    res.send("ok");
  });
});

router.get("/:id/", passport(), function(req, res) {
  Device.get(req.params.id).then(device => {
    res.send(device);
  });
});

router.get("/:id/data", passport(), function(req, res) {
  Device.get(req.params.id).then(device => {
    device.data().then(data => {
      res.send(data);
    });
  });
});
