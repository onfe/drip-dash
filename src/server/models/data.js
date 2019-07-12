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

  Data.simplify = function(dataList) {
    var simple = dataList.map(dat => {
      var dataValues = JSON.parse(dat["data"]);
      if (dataValues["timestamp"]) {
        delete dataValues["timestamp"];
      };
      dataValues["timestamp"] = dat["timestamp"];
      return dataValues;
    });
    return simple;
  }

  return Data;
};
