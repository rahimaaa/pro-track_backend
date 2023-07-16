const users = require("./users");
const help_request = require("./help_request");
const lecture_table = require("./lecture_table");
const feed_table = require("./feed_table");
const assignmentTable = require("./assignmentTable")
const assignmentStatus = require("./assignmentStatus")
const resources_table = require("./resources_table")

// Associations Go Here




module.exports = {
  users,
  help_request,
  lecture_table,
  feed_table,
  assignmentStatus,
  assignmentTable,
  resources_table,
};