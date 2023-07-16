const User = require("./user");
const help_request = require("./help_request");
const assignmentTable = require("./assignmentTable")
const assignmentStatus = require("./assignmentStatus")
const resources_table = require("./resources_table")

// Associations Go Here
User.hasMany(help_request);
User.hasMany(resources_table);
//User.hasMany(lecture_table);
//User.hasMany(feed_table);
User.belongsToMany(group, {through: "user_group"})
Group.belongsToMany(User, {through: "user_group"})

module.exports = {
  User,
  help_request,
  assignmentStatus,
  assignmentTable,
  resources_table,
};