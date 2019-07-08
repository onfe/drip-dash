const express = require("express");
const router = express.Router();
const passport = require("../passport");
const Device = require("../models").Device;
const Data = require("../models").Data;

const { Op } = require("sequelize");

module.exports = router;
// we use the passport to secure routes to authenticated users only.
router.get("/:id/info", passport(), function(req, res) {
  // if (!req.query.id) { res.status(400).send(); return; };
  Device.findOne({ where: { progName: req.query.id } }).then(device => {
    if (device) {
      Data.findAll({
        where: {
          DeviceId: device.id,
          timestamp: { [Op.gte]: Date.now() - 1000 * 60 }
        }
      }).then(data => {
        var dat = [];
        data.forEach(d => {
          dat.push({
            id: d.dataValues.id,
            timestamp: d.dataValues.timestamp,
            data: JSON.parse(d.dataValues.data)
          });
        });
        res.json(dat);
      });
    } else {
      console.log("not found: " + req.body.id);
      // res.status(404).send();
    }
  });
});

router.get("/:id/data", passport(), function(req, res) {
  // if (!req.query.id) { res.status(400).send(); return; };
  Device.findOne({ where: { progName: req.query.id } }).then(device => {
    if (device) {
      Data.findAll({
        where: {
          DeviceId: device.id,
          timestamp: { [Op.gte]: Date.now() - 1000 * 60 }
        }
      }).then(data => {
        var dat = [];
        data.forEach(d => {
          dat.push({
            id: d.dataValues.id,
            timestamp: d.dataValues.timestamp,
            data: JSON.parse(d.dataValues.data)
          });
        });
        res.json(dat);
      });
    } else {
      console.log("not found: " + req.body.id);
      // res.status(404).send();
    }
  });
});
