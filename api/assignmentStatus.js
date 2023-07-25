const express = require("express");
const router = express.Router();
const { AssignmentStatus, User} = require("../db/models");
const { isTA } = require("./middleware/isTa");
// Root here is localhost:8080/api/AssignmentStatus/all

//get all assignment statuses
router.get("/all", isTA, async (req, res, next) => {
  try {
    const allAssignments = await AssignmentStatus.findAll({include: User});

    allAssignments
      ? res.status(200).json(allAssignments)
      : res.status(404).send("No Assignments Statuses Found");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:id",  async (req, res, next) => {
  try {
    req.params.id;
    const assignment = await AssignmentStatus.findAll({
      where: { id: req.params.id },
    });

    if (!AssignmentStatus) {
      return res.status(404).json({ error: "AssignmentStatus not found" });
    }

    res.json(assignment);
  } catch (error) {
    // Pass any error to the error handling
    next(error);
  }
});

router.get("/:id/:assignmentId", async (req, res, next) => {
  try {
    const { id, assignmentId } = req.params;
    const assignment = await AssignmentStatus.findOne({
      where: { id: req.params.id, assignmentId: req.params.assignmentId },
    });

    if (!assignment) {
      return res.status(404).json({ error: "AssignmentStatus not found" });
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

//     const allStatuses = await AssignmentStatus.findAll({ where: { assignmentId: parseInt(assignmentId)} });

//     if (!allStatuses) {

//       return res.status(404).json({ error: "AssignmentStatus not found" });
//     }

//     res.json(allStatuses);
//   } catch (error) {
//     // Pass any error to the error handling
//     next(error);
//   }
// });

router.put("/:id/:assignmentId/", async (req, res, next) => {
  try {
    const { status, feedback, submission } = req.body;
    const { id, assignmentId } = req.params;

    const updatedStatus = await AssignmentStatus.update(
      { status, feedback, submission },
      {
        where: { id, assignmentId: parseInt(assignmentId) },
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

    const newAssignmentStatus = await AssignmentStatus.create({
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
