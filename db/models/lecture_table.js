const { DataTypes} =require("sequelize");
const db = require ("../db");
//const DEFAULTVALUE = " ";

//Creation of Table named help_request
const lecture_table = db.define("lecture_table", {
   //adding columns to the table
    
    title:{
      type: DataTypes.STRING,
      allowNull:true,
    },
    description:{
        type: DataTypes.TEXT("long"),
        allowNull:true,
      },
    recordings:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    slides:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      lecture_date:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      posted_by:{
        unique: true,
        type: DataTypes.STRING,
        allowNull: true,
      }
      
});

module.exports = lecture_table;