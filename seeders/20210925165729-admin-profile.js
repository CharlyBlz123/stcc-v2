require('dotenv').config();
const uuid = require('uuid');
const passwordGenerator = require('../utils/encryptedPasswordGenerator.js');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      id: uuid.v4(),
      userName: 'Juan Luis Vázquez Hernández',
      userCode: 'devAdmin',
      role: 'admin',
      email: process.env.MAILUSER,
      status: true,
      password: await passwordGenerator(process.env.PASS),
      curp: "VAHJ980220HJCZRN03",
      phone: "3121122913",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};