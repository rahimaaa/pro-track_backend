const { DataTypes } = require("sequelize");
const db = require("../db");
//const DEFAULTVALUE = " ";

//Creation of Table named HelpRequest
const HelpRequest = db.define("help_request", {
  //adding columns to the table

  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  request: {
    type: DataTypes.TEXT("long"),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Pending",
  },
  accepted: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
});

module.exports = HelpRequest;
