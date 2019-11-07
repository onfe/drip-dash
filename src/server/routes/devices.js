const express = require("express");
const router = express.Router();
const passport = require("../passport");
const dA = require("../controllers/dAnalytics");
const Device = require("../models").Device;
const Data = require("../models").Data;

module.exports = router;
// we use the passport to secure routes to authenticated users only.
router.get("/", passport(), function(req, res) {
  Device.list().then(devices => {
    devices = devices.map(d => ({ ...d, status: dA.status(d) }));
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

function getDeviceHandle(req, res) {
  Device.get(req.params.id).then(device => {
    device.data().then(data => {
      data = Data.simplify(data);
      device = device.dataValues;
      device.status = dA.status(device);
      device.glances = dA.glances(device, data);
      console.log(device);
      res.json({ device, data });
    });
  });
}
