const { DataTypes } = require("sequelize");
const db = require("../db");

const group_table = require("./group_table", {
  group_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = group_table;
