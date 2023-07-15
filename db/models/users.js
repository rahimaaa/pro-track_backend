const { DataTypes } = require("sequelize");
const db = require("../db");
const DEFAULTVALUE = " ";

const users = db.define("users", {
  //add the table

  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "https://i.stack.imgur.com/l60Hf.png",
  },
  email: {
    unique: true,
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userType: {

    type: DataTypes.ENUM( "student", "TA", "admin"),
    
    defaultValue:"student",

  },
  cohort_year: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = users;
