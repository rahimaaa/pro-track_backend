const User = require("./user");
const help_request = require("./help_request");
const lecture_table = require("./lecture_table");
const feed_table = require("./feed_table");
const assignmentTable = require("./assignmentTable")
const assignmentStatus = require("./assignmentStatus")
const resources_table = require("./resources_table")

// Associations Go Here
//const assignmentTable = require("./assignmentTable");
////const assignmentStatus = require("./assignmentStatus");
//const resources_table = require("./resources_table");
/*
const user_group_table = require("./user_group_table");
const group_table = require("./group_table");





// USER TO HELPREQUEST TABLE RELEATIONSHIP
User.hasMany(help_request, {
  foreignKey: 'studentId', //'taId'
});
help_request.belongsTo(User);

//USER TO RESOURCES TABLE RELEATIONSHIP  //User.hasMany(resources_table);
User.hasMany(resources_table, {
  foreignKey: 'userId', 
});
resources_table.belongsTo(User);


//USER TO LECTURE TABLE RELEATIONSHIP
// User.hasMany(lecture_table, {
//   foreignKey: 'userId', 
// });
// lecture_table.belongsTo(User);



//USER TO FEEDTABLE RELEATIONSHIP
//User.hasMany(feed_table);
// User.hasMany(feed_table, {
//   foreignKey: 'userId', 
// });
// feed_table.belongsTo(User);

//USER TO USERGROUP TABLE RELEATIONSHIP
User.belongsToMany(user_group_table, {
  through: "user_group",
  foreignKey: "user_id"
})
user_group_table.belongsToMany(User, {
  through: "user_group",
  foreignKey: "user_group"
})


//ASSIGNMENT TO ASSIGNMENT STATUS TABLE




//ASSIGNMENT STATUS TO GROUPTABLE



//GROUP TABLE TO USER GROUP TABLE

*/
module.exports = {
  User,
  help_request,
  lecture_table,
  feed_table,
  assignmentStatus,
  assignmentTable,
  resources_table,
  //user_group_table,
  //group_table,
};