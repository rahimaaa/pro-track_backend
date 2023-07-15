const router = require("express").Router();

// Already mounted on /api/
router.use("/users", require("./users"));
router.use("/help_request", require("./help_request"));
router.use("/lecture_table", require("./lecture_table"));
router.use("/feed_table", require("./feed_table"));
router.use("/assignmentStatus", require("./assignmentStatus"));


// 404 Handling
router.use((req, res, next) => {
  const error = new Error("404 Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;