const user = require("./user");
const help_request = require("./help_request");
const assignmentTable = require("./assignmentTable")
const assignmentStatus = require("./assignmentStatus")
const resources_table = require("./resources_table")

// Associations Go Here




module.exports = {
  user,
  help_request,
  assignmentStatus,
  assignmentTable,
  resources_table,
};