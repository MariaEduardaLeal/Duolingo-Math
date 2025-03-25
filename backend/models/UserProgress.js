const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Phase = require('./Phase');

const UserProgress = sequelize.define('UserProgress', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  phase_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Phase,
      key: 'id'
    }
  },
  stars_earned: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  last_attempt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'user_progress',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'phase_id']
    }
  ]
});

// Relacionamentos
UserProgress.belongsTo(User, { foreignKey: 'user_id' });
UserProgress.belongsTo(Phase, { foreignKey: 'phase_id' });
User.hasMany(UserProgress, { foreignKey: 'user_id' });
Phase.hasMany(UserProgress, { foreignKey: 'phase_id' });

module.exports = UserProgress;