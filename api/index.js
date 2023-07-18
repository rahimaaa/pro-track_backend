const router = require("express").Router();

// Already mounted on /api/
router.use("/user", require("./User"));
router.use("/help-request", require("./HelpRequest"));
router.use("/lecture", require("./Lecture"));
router.use("/feed", require("./Feed"));
router.use("/assignment-status", require("./AssignmentStatus"));
router.use("/assignment", require("./Assignment"));
router.use("/resource", require("./Resource"));

// 404 Handling
router.use((req, res, next) => {
  const error = new Error("404 Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
