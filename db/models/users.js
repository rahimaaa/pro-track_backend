const { DataTypes} =require("sequelize");
const db = require ("../db");
const DEFAULTVALUE = " ";

const users = db.define("users", {
   //add the table
    
    firstName:{
      type: DataTypes.STRING,
      allowNull:true,
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull:true,
      },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cohort_year: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      
});

module.exports = users;