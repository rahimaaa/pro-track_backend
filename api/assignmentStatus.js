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

///;email, /:email/:assignmentId/  , assignmentId/

router.put("/:email/:assignmentId/", async (req, res, next) => {
  try {
    const { status, feedback , submission } = req.body;
    const { email, assignmentId } = req.params;

    const updatedStatus = await assignmentStatus.update(
      { status, feedback , submission},
      {
        where: { email, assignmentId : parseInt(assignmentId)},
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
