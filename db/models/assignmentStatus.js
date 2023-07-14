const { DataTypes} =require("sequelize");
const db = require ("../db");
const DEFAULTVALUE = " ";

const assignmentStatus = db.define("AssignmentStatus", {
   //add the table
    
    email:{
      //unique:true,
      type: DataTypes.STRING,
      allowNull:true,
    },
    AssignmentId:{
        type: DataTypes.INTEGER,
        allowNull:true,
      },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      submission: {
        //link
        type: DataTypes.STRING,
        allowNull: true,
      },
      submissionDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      feedback: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      
});

module.exports = assignmentStatus;