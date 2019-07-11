"use strict";
const { Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Data = sequelize.define(
    "Data",
    {
      timestamp: DataTypes.DATE,
      data: DataTypes.TEXT
    },
    {}
  );
  Data.associate = function(models) {
    Data.belongsTo(models.Device, { foreignKey: "deviceId" });
  };

  Data.getSelection = function(dID, from, to) {
    if (!from) {
      var from = Date.now() - 1000 * 60 * 20;
    }
    if (!to) {
      // from only
      var to = new Date();
    }
    return Data.findAll({
      where: {
        DeviceId: dID,
        timestamp: {
          [Op.gte]: from,
          [Op.lte]: to
        }
      }
    });
  };

  Data.prototype.getData = function() {
    return JSON.parse(this.data);
  };

  return Data;
};
