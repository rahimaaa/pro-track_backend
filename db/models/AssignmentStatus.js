const { DataTypes } = require("sequelize");
const db = require("../db");


const AssignmentStatus = db.define("assignment_status", {
  //add the table

  email: {
    //unique:true,
    type: DataTypes.STRING,
    allowNull: true,
  },
  assignmentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    
  },
  // groupId: {
  //   type: DataTypes.INTEGER,
  //   allowNull: true,
  // },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue:false,
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

module.exports = AssignmentStatus;
