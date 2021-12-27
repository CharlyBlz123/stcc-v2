'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('registries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      time: {
        type: Sequelize.STRING
      },
      temperature: {
        type: Sequelize.DOUBLE
      },
      pression: {
        type: Sequelize.DOUBLE
      },
      humidity: {
        type: Sequelize.DOUBLE
      },
      wind: {
        type: Sequelize.DOUBLE
      },
      wind_max: {
        type: Sequelize.DOUBLE
      },
      radiation: {
        type: Sequelize.DOUBLE
      },
      precipitation: {
        type: Sequelize.DOUBLE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('registries');
  }
};