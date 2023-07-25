const express = require("express");
const router = express.Router();
const { Assignment } = require("../db/models");
const {isTA} = require("./middleware/isTa");

router.get("/all", async (req, res, next) => {
  try {
    const allAssignments = await Assignment.findAll();

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

// router.get("/:id", async (req, res, next) => {
//   try {
//     req.params.id;
//     console.log(req.params);
//     const assignment = await Assignment.findByPk({
//       where: { id: req.params.id },
//     });

//     if (!assignment) {
//       return res.status(404).json({ error: "Assignment not found" });
//     }

//     res.json(assignment);
//   } catch (error) {
//     next(error);
//   }
// });

router.get("/:id", async (req, res, next) => {
  try {
    const assignmentId = req.params.id; // Get the ID from the URL parameters
    console.log(req.params);
    const assignment = await Assignment.findByPk(assignmentId);

    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    res.json(assignment);
  } catch (error) {
    next(error);
  }
});


router.delete("/:id", isTA, async (req, res, next) => {
  try {
    

    // Delete the user with the provided email from the database
    await Assignment.destroy({ where: { id: req.params.id } });

    res.json({ message: "Assignment removed successfully" });
    //Send response message (User removed successfully)
  } catch (error) {
    //Handling any errors that occur
    next(error);
  }
});

router.put("/:id", isTA, async (req, res, next) => {
  try {
    const { assignmentName, instruction, group, assignment_date, due_date } =
      req.body;
    const updatedAssignment = await Assignment.update(
      {
        assignmentName,
        instruction,
        group,
        assignment_date,
        due_date,
      },
      {
        where: { id: req.params.id },
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

router.post("/", isTA, async (req, res, next) => {
  try {
    const { assignmentName, instruction, group, assignment_date, due_date } =
      req.body;
console.log("is hiting this route")
    const assignment = await Assignment.findOne({
      where: { assignmentName: req.body.assignmentName },
    });
    if (assignment) {
      return res.json(assignment);
    }

    const newAssignment = await Assignment.create({
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
