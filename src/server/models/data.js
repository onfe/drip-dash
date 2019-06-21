"use strict";
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

  Data.prototype.getData = function() {
    return JSON.parse(this.data);
  };

  return Data;
};
