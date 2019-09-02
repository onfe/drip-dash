const express = require("express");
const router = express.Router();
const passport = require("../passport");
const status = require("../controllers/status");
const Device = require("../models").Device;
const Data = require("../models").Data;

module.exports = router;
// we use the passport to secure routes to authenticated users only.
router.get("/", passport(), function(req, res) {
  Device.list().then(devices => {
    devices = devices.map(device => ({ ...device, status: status.get().status}));
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

router.get("/:id/", passport(), getDeviceHandle);

function getDeviceHandle(req, res, latest=false) {
  Device.get(req.params.id).then(device => {
    device.data().then(data => {
      data = Data.simplify(data);
      device.status = "ok";
      device.glances = {};
      res.json({device, data});
    });
  });
}
