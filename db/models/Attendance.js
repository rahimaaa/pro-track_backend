const { DataTypes } = require("sequelize");
const db = require("../db");

const Attendance = db.define("attendance", {
  userId: {
    type: DataTypes.INTEGER,
  },
  monday: {
    type: DataTypes.ENUM("P", "U", "E", "L"),
  },
  tuesday: {
    type: DataTypes.ENUM("P", "U", "E", "L"),
  },
  wednesday: {
    type: DataTypes.ENUM("P", "U", "E", "L"),
  },
  thursday: {
    type: DataTypes.ENUM("P", "U", "E", "L"),
  },
  friday: {
    type: DataTypes.ENUM("P", "U", "E", "L"),
  },
  saturday: {
    type: DataTypes.ENUM("P", "U", "E", "L"),
  },
  sunday: {
    type: DataTypes.ENUM("P", "U", "E", "L"),
  },
});

module.exports = Attendance;
