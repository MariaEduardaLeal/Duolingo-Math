const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: '127.0.0.1',
  database: 'math_duolingo',
  username: 'root',
  password: '12345',
  logging: false
});

module.exports = sequelize;