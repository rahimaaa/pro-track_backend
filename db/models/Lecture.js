const { DataTypes } = require("sequelize");
const db = require("../db");
//const DEFAULTVALUE = " ";

//Creation of Table named HelpRequest
const Lecture = db.define("lecture", {
  //adding columns to the table

  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT("long"),
    allowNull: true,
  },
  recordings: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  slides: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lecture_date: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // userId: {
  //   //unique: true,
  //   type: DataTypes.INTEGER,
  //   allowNull: true,
  // },
});

module.exports = Lecture;
