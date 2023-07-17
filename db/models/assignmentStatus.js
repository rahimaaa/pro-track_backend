const { DataTypes } = require("sequelize");
const db = require("../db");


const assignmentStatus = db.define("assignmentStatus", {
  //add the table

  email: {
    //unique:true,
    type: DataTypes.STRING,
    allowNull: true,
  },
  assignmentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  groupId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
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

module.exports = assignmentStatus;
