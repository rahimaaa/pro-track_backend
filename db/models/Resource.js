const { DataTypes } = require("sequelize");
const db = require("../db");
const DEFAULTVALUE = " ";

const Resource = db.define("resource", {
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
  link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
    linkDescription: {
    type: DataTypes.TEXT("long"),
    allowNull: true,
  },
    linkPreviewImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Resource;
