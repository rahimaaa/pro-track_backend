const { DataTypes } = require("sequelize");
const db = require("../db");


const Group = db.define("group", {
 userId: {
    type: DataTypes.INTEGER,

 },
 groupId: {
  type: DataTypes.STRING,
 },
 assignmentStatusId: {
    type: DataTypes.INTEGER,
 }
});

module.exports = Group;

