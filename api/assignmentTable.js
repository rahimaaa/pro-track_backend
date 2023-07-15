const express = require("express");
const router = express.Router();
const { assignmentTable } = require("../db/models");

router.get("/all", async (req, res, next) => {
  try {
    const allAssignments = await assignmentTable.findAll();

    console.log("these are all the users: " + allAssignments);

    if (!allAssignments) {
        return res.status(404).json({ error: "Assignment not found" });
      }
  
      res.json(allAssignments);
    // allAssignments
    //   ? res.status(200).json(allAssignments)
    //   : res.status(404).send("No Assignments Statuses Found");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:assignmentName", async (req, res, next) => {
  try {
    req.params.assignmentName;
    console.log(req.params);
    const assignment = await assignmentTable.findOne({
      where: { assignmentName: req.params.assignmentName },
    });

    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    res.json(assignment);
  } catch (error) {
    next(error);
  }
});

router.delete("/:assignmentName", async (req, res, next) => {
  try {
    const name = req.params.assignmentName;

    // Delete the user with the provided email from the database
    await assignmentTable.destroy({ where: { assignmentName: name } });

    res.json({ message: "Assignment removed successfully" });
    //Send response message (User removed successfully)
  } catch (error) {
    //Handling any errors that occur
    next(error);
  }
});

router.put("/:assignmentName", async (req, res, next) => {
  try {
    const { assignmentName, instruction, group, assignment_date, due_date } =
      req.body;
    const updatedAssignment = await assignmentTable.update(
      {
        assignmentName,
        instruction,
        group,
        assignment_date,
        due_date,
      },
      {
        where: { assignmentName: req.params.assignmentName },
        returning: true,
      }
    );

    updatedAssignment
      ? res.status(200).send("assignment updated successfully")
      : res.status(404).send("assignment Not Found");
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { assignmentName, instruction, group, assignment_date, due_date } =
      req.body;

    const assignment = await assignmentTable.findOne({
      where: { assignmentName: req.body.assignmentName },
    });
    if (assignment) {
      return res.json(assignment);
    }
    
    const newAssignment = await assignmentTable.create({
      assignmentName,
      instruction,
      group,
      assignment_date,
      due_date,
    });

    res.status(201).json(newAssignment);
  } catch (error) {
    //Handling any errors that occur
    next(error);
  }
});

module.exports = router;
