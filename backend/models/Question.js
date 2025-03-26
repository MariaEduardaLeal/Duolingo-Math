const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Phase = require('./Phase');

const Question = sequelize.define('Question', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  phase_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Phase, key: 'id' }
  },
  question_number: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  question_text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  option_a: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  option_b: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  option_c: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  option_d: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  correct_option: {
    type: DataTypes.CHAR(1),
    allowNull: false
  }
}, {
  tableName: 'questions',
  timestamps: false,
  indexes: [{ unique: true, fields: ['phase_id', 'question_number'] }]
});

Question.belongsTo(Phase, { foreignKey: 'phase_id' });
Phase.hasMany(Question, { foreignKey: 'phase_id' });

module.exports = Question;