const { DataTypes} =require("sequelize");
const db = require ("../db");
//const DEFAULTVALUE = " ";

//Creation of Table named help_request
const help_request = db.define("help_request", {
   //adding columns to the table
    
    stud_email:{
      unique: true,
      type: DataTypes.STRING,
      allowNull:true,
    },
    help_request:{
        type: DataTypes.TEXT("long"),
        allowNull:true,
      },
    status:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    ta_email: {
        unique: true,
        type: DataTypes.STRING,
        allowNull: true,
      },
      accepted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      
});

module.exports = help_request;