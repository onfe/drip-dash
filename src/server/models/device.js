"use strict";
module.exports = (sequelize, DataTypes) => {
  const Device = sequelize.define(
    "Device",
    {
      progName: DataTypes.STRING,
      name: DataTypes.STRING,
      type: DataTypes.INTEGER,
      online: DataTypes.DATE,
      rssi: DataTypes.INTEGER
    },
    {}
  );
  Device.associate = function(models) {
    Device.hasMany(models.Data);
  };

  Device.prototype.getName = function() {
    return this.name ? this.name : this.progName;
  };

  Device.prototype.update = function(rssi) {
    this.online = new Date();
    this.rssi = rssi;
    this.save();
  };

  Device.get = function(progName) {
    var d = this.findOne({ where: { progName: progName } }).then(device => {
      return device;
    });
    return d;
  };

  Device.list = function() {
    var d = this.findAll({ raw: true }).then(devices => {
      return devices;
    });
    return d;
  };

  Device.prototype.rename = function(name) {
    if (name.length == 0) {
      this.name = this.progName;
      this.save();
    } else if (name == this.progName) {
      return;
    } else {
      this.name = name;
      this.save();
    }
  };

  Device.prototype.data = function(from, to) {
    return sequelize.models.Data.getSelection(this.id, from, to).then(data => {
      return data;
    });
  };

  return Device;
};
