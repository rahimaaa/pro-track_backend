const { DataTypes } = require("sequelize");
const db = require("../db");



const Zoom = db.define("zoom", {
    //add the table
  
    info: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    link : {
       type: DataTypes.STRING,
       allowNull: false,
    }
});

module.exports = Zoom;