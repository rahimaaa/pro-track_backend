const { DataTypes } = require("sequelize");
const db = require("../db");
const DEFAULTVALUE = " ";

const Assignment = db.define("assignment", {
  //add the table
 
  assignmentName: {
    unique:true,
    type: DataTypes.STRING,
    allowNull: false,
  },
  instruction: {
    type: DataTypes.TEXT("long"),
    allowNull: true,
  },
  group: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  assigned: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  assignment_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  due_date: {
   
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = Assignment;