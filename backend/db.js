const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

// SQLite database stored in file
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite'),
});

// Define MeetingAgenda model
const MeetingAgenda = sequelize.define('MeetingAgenda', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  topics: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  agenda: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  generatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = { sequelize, MeetingAgenda };
