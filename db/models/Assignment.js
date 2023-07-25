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
    type: DataTypes.STRING,
    allowNull: true,
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