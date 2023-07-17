const express = require("express");
const router = express.Router();
const { assignmentStatus } = require("../db/models");

// Root here is localhost:8080/api/assignmentStatus/all

//get all assignment statuses
router.get("/all", async (req, res, next) => {
  try {
    const allAssignments = await assignmentStatus.findAll();

    console.log("these are all the users: " + allAssignments);

    allAssignments
      ? res.status(200).json(allAssignments)
      : res.status(404).send("No Assignments Statuses Found");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:email", async (req, res, next) => {
  try {
    req.params.email;
    console.log(req.params);
    const assignment = await assignmentStatus.findAll({
      where: { email: req.params.email },
    });

    if (!assignmentStatus) {
      return res.status(404).json({ error: "assignmentStatus not found" });
    }

    res.json(assignment);
  } catch (error) {
    // Pass any error to the error handling
    next(error);
  }
});

router.get("/:email/:assignmentId", async (req, res, next) => {
  try {
    const { email, assignmentId } = req.params;
    const assignment = await assignmentStatus.findOne({
      where: { email: req.params.email, assignmentId: req.params.assignmentId },
    });

    if (!assignment) {
      return res.status(404).json({ error: "assignmentStatus not found" });
    }

    res.json(assignment);
  } catch (error) {
    // Pass any error to the error handling
    next(error);
  }
});

// router.get("/:assignmentId", async (req, res, next) => {
//   try {
//     const assignmentId  = req.params;

//     const allStatuses = await assignmentStatus.findAll({ where: { assignmentId: parseInt(assignmentId)} });

//     if (!allStatuses) {

//       return res.status(404).json({ error: "assignmentStatus not found" });
//     }

//     res.json(allStatuses);
//   } catch (error) {
//     // Pass any error to the error handling
//     next(error);
//   }
// });

router.put("/:email/:assignmentId/", async (req, res, next) => {
  try {
    const { status, feedback, submission } = req.body;
    const { email, assignmentId } = req.params;

    const updatedStatus = await assignmentStatus.update(
      { status, feedback, submission },
      {
        where: { email, assignmentId: parseInt(assignmentId) },
        // returning: true,
      }
    );

    if (updatedStatus[0] === 0) {
      res.status(404).send("User not found or no changes made");
    } else {
      res.status(200).send("Status updated successfully");
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      email,
      assignmentId,
      status,
      groupId,
      submission,
      submissionDate,
      feedback,
    } = req.body;

    const newAssignmentStatus = await assignmentStatus.create({
      email,
      assignmentId,
      status,
      groupId,
      submission,
      submissionDate,
      feedback,
    });

    res.status(201).json(newAssignmentStatus);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
