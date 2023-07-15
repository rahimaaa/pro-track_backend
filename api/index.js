const router = require("express").Router();

// Already mounted on /api/
router.use("/users", require("./users"));
router.use("/help_request", require("./help_request"));
router.use("/assignmentStatus", require("./assignmentStatus"));
router.use("/assignmentTable", require("./assignmentTable"));
router.use("/resources_table", require("./resources_table"));

// 404 Handling
router.use((req, res, next) => {
  const error = new Error("404 Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;