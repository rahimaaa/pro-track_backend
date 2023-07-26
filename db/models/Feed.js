const { DataTypes } = require("sequelize");
const db = require("../db");
//const DEFAULTVALUE = " ";

//Creation of Table named HelpRequest
const Feed = db.define("feed", {
  //adding columns to the table

  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  content: {
    type: DataTypes.TEXT("long"),
    allowNull: true,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // description: {
  //   type: DataTypes.TEXT("long"),
  //   allowNull: true,
  // },
});

module.exports = Feed;
