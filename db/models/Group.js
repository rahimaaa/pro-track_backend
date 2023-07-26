const { DataTypes } = require("sequelize");
const db = require("../db");


const Group = db.define("group", {
 userId: {
    type: DataTypes.INTEGER,

 },
 groupId: {
  type: DataTypes.INTEGER,
 },
 assignmentStatusId: {
    type: DataTypes.INTEGER,
 }
});

module.exports = Group;

