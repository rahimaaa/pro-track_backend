const { DataTypes } = require("sequelize");
const db = require("../db");
//const DEFAULTVALUE = " ";

//Creation of Table named HelpRequest
const HelpRequest = db.define("help_request", {
  //adding columns to the table

  studentId: {
    unique: true,
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  request: {
    type: DataTypes.TEXT("long"),
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  taId: {
    unique: true,
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  accepted: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
});

module.exports = HelpRequest;
