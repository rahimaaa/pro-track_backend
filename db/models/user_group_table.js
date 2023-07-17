const { DataTypes } = require("sequelize");
const db = require("../db");

const user_group_table = db.define("user_group_table", {
user_group: {
    type: DataTypes.INTEGER,
},
user_id : {
    type: DataTypes.INTEGER,
},
group_id : {
    type: DataTypes.INTEGER,
}

});

module.exports = user_group_table;