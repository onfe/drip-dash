const express = require("express");
const router = express.Router();

const Device = require("../models").Device;
const Data = require("../models").Data;

module.exports = router;

router.get("/:id/", function(req, res) {
  var d = Device.get(req.params.id).then(device => {
    if (device) {
      device.update();
      return device;
    } else {
      return Device.create({
        progName: req.params.id,
        type: 0,
        online: new Date()
      });
    }
  });

  d.then(d => {
    console.log(d);
    Data.create(
      {
        timestamp: Date.now(),
        data: JSON.stringify(req.body),
        deviceId: d.id
      },
      {
        include: Device
      }
    )
      .then(function() {})
      .catch(function(err) {
        console.log(err);
      });
  });
  res.send("OK");
});
