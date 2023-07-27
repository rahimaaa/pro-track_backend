const User = require("./User");
const HelpRequest = require("./HelpRequest");
const Lecture = require("./Lecture");
const Feed = require("./Feed");
const Assignment = require("./Assignment");
const AssignmentStatus = require("./AssignmentStatus");
const Resource = require("./Resource");
const Zoom = require("./Zoom");
const Group = require("./Group");
const Attendance = require("./Attendance");

// USER TO HELPREQUEST TABLE RELEATIONSHIP
User.hasMany(HelpRequest, {
  foreignKey: "studentId",
  as: "studentRequest",
});
HelpRequest.belongsTo(User, {
  foreignKey: "studentId",
  as: "student",
});

User.hasMany(HelpRequest, {
  foreignKey: "taId",
  as: "ta",
});
HelpRequest.belongsTo(User, {
  foreignKey: "taId",
  as: "ta",
});

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
// User.belongsToMany(AssignmentStatus, {
//   through: "user_assignment_status",
// });

User.hasMany(AssignmentStatus);
AssignmentStatus.belongsTo(User);

// AssignmentStatus.belongsToMany(User, {
//   through: "user_assignment_status",
// });
User.hasMany(Group);
Group.belongsTo(User);

AssignmentStatus.hasMany(Group);
Group.belongsTo(AssignmentStatus);

//ASSIGNMENT TO ASSIGNMENT STATUS TABLE
Assignment.hasMany(AssignmentStatus);
AssignmentStatus.belongsTo(Assignment);

User.hasMany(Attendance);
Attendance.belongsTo(User);

module.exports = {
  User,
  HelpRequest,
  Lecture,
  Feed,
  AssignmentStatus,
  Assignment,
  Resource,
  Zoom,
  Group,
  Attendance,
};
