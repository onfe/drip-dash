'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn("Data", "DeviceId", { transaction: t }),
        queryInterface.addColumn(
          "Data",
          "deviceId",
          {
            allowNull: false,
            type: Sequelize.INTEGER,
            onDelete: "CASCADE",
            references: {
              model: "Devices",
              key: "id"
            }
          },
          { transaction: t }
        )
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn("Data", "deviceId", { transaction: t }),
        queryInterface.addColumn(
          "Data",
          "DeviceId",
          {
            allowNull: false,
            type: Sequelize.INTEGER,
            onDelete: "CASCADE",
            references: {
              model: "Devices",
              key: "id"
            }
          },
          { transaction: t }
        )
      ]);
    });
  }
};
