const { DataTypes} = require("sequelize");
const db = require ("../db");
//const DEFAULTVALUE = " ";

//Creation of Table named help_request
const feed_table = db.define("feed_table", {
   //adding columns to the table
    
    title:{
      type: DataTypes.STRING,
      allowNull:true,
    },
    content:{
        type: DataTypes.TEXT("long"),
        allowNull:true,
      },
    link:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    posted_by:{
      type: DataTypes.STRING,
      allowNull: true,
      }
      
});

module.exports = feed_table;

