'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class registry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  registry.init({
    date: DataTypes.DATE,
    time: DataTypes.STRING,
    temperature: DataTypes.DOUBLE,
    pression: DataTypes.DOUBLE,
    humidity: DataTypes.DOUBLE,
    wind: DataTypes.DOUBLE,
    wind_max: DataTypes.DOUBLE,
    radiation: DataTypes.DOUBLE,
    precipitation: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'registry',
  });
  return registry;
};