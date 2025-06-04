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
  port: process.env.DB_PORT || 4000, // Porta padrão do TiDB
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: false,
  dialectOptions: {
    ssl: {
      require: true, // Exige SSL
      rejectUnauthorized: true // Garante que o certificado seja validado
    }
  }
});

module.exports = sequelize;
