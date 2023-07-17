const User = require("./User");
const HelpRequest = require("./HelpRequest");
const Lecture = require("./Lecture");
const Feed = require("./Feed");
const Assignment = require("./Assignment");
const AssignmentStatus = require("./AssignmentStatus");
const Resource = require("./Resource");


// USER TO HELPREQUEST TABLE RELEATIONSHIP
User.hasMany(HelpRequest, {
  foreignKey: "studentId",
  foreighKey: "taId",
});
HelpRequest.belongsTo(User);

//USER TO RESOURCES TABLE RELEATIONSHIP  //User.hasMany(Resource);
User.hasMany(Resource);
Resource.belongsTo(User);

//USER TO LECTURE TABLE RELEATIONSHIP
User.hasMany(Lecture);
Lecture.belongsTo(User);

//USER TO FEEDTABLE RELEATIONSHIP
//User.hasMany(Feed);
User.hasMany(Feed);
Feed.belongsTo(User);

// //USER TO assignment status TABLE RELEATIONSHIP
User.belongsToMany(AssignmentStatus, {
  through: "user_assignment_status",
});

AssignmentStatus.belongsToMany(User, {
  through: "user_assignment_status",
});



//ASSIGNMENT TO ASSIGNMENT STATUS TABLE
Assignment.hasMany(AssignmentStatus);
AssignmentStatus.belongsTo(Assignment);


module.exports = {
  User,
  HelpRequest,
  Lecture,
  Feed,
  AssignmentStatus,
  Assignment,
  Resource,
  
};
