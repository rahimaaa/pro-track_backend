const { DataTypes} =require("sequelize");
const db = require ("../db");
const DEFAULTVALUE = " ";

const users = db.define("users", {
   //add the table
    
    firstName:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull:false,
      },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cohort_year: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
});

module.exports = users;