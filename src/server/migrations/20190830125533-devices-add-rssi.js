"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          "Devices",
          "rssi",
          {
            type: Sequelize.INTEGER
          },
          { transaction: t }
        )
      ]);
    });
  },

  down: queryInterface => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn("Devices", "rssi", { transaction: t })
      ]);
    });
  }
};
