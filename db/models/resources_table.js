const { DataTypes } = require("sequelize");
const db = require("../db");
const DEFAULTVALUE = " ";

const resources_table = db.define("resourcesTable", {
  //add the table

  title: {
   
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  posted_by: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = resources_table;