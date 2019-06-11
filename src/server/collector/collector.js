const express = require("express");
const router = express.Router();

const Device = require("../models").Device

module.exports = router;

router.get("/:id/", function( req, res ) {
  d = Device.getByProgName(req.params.id).then( (device) => {
    if (device) {
      device.update()
      return device;
    } else {
      return Device.create({
        progName: req.params.id,
        type: 0,
        online: new Date()
      });
    }
  });
  d.then((d) => console.log(d));
  res.send("OK");
});
