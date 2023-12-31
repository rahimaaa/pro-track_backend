const router = require("express").Router();

// Already mounted on /api/
router.use("/user", require("./user"));
router.use("/help-request", require("./helpRequest"));
router.use("/lecture", require("./lecture"));
router.use("/feed", require("./feed"));
router.use("/assignment-status", require("./assignmentStatus"));
router.use("/assignment", require("./assignment"));
router.use("/resource", require("./resource"));
router.use("/zoom", require("./zoom"));
router.use("/group", require("./group"));
router.use("/attendance", require("./attendance"));

// 404 Handling
router.use((req, res, next) => {
  const error = new Error("404 Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
