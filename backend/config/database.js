require('dotenv').config();
const { Sequelize } = require('sequelize');

console.log(
  'host', process.env.DB_HOST,
  'database', process.env.DB_DATABASE,
  'username', process.env.DB_USERNAME,
  'password', process.env.DB_PASSWORD,
)

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: false
});

module.exports = sequelize;