const uuid = require('uuid');
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
    }
  };
  user.init({
    userName: DataTypes.UUIDV4,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    rfc: DataTypes.STRING,
    curp: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  user.beforeCreate((user, _ ) => {
    return user.id = uuid.v4();
  });
  return user;
};