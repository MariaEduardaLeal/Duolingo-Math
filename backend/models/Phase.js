const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Phase = sequelize.define('Phase', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  phase_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  required_stars: {
    type: DataTypes.INTEGER,
    defaultValue: 3
  },
  explanation: {  // Novo campo adicionado
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'phases',
  timestamps: false
});

module.exports = Phase;