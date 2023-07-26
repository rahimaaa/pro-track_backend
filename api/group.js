const express = require("express");
const router = express.Router();
const { Group, AssignmentStatus, User} = require("../db/models");
const { isTA } = require("./middleware/isTa");

// //GET all groups for 1 user by user id
router.get("/:assignmentId", async (req, res, next) => {
  try {
    const assignmentId = req.params.assignmentId; // Get the ID from the URL parameters
    console.log(req.params);

    //const {}
    // const groups = await Group.findAll({where: { }});
    const assignments = await AssignmentStatus.findAll({where: { assignmentId: assignmentId}, include: {model: Group, include: User}})

    if (!assignments) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    res.json(assignments);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { userIds, groupId, assignmentStatusId } = req.body;

    const group = userIds.map((id) => {
      return {
        userId: id,
        assignmentStatusId,
        groupId,
      };
    });
    const newGroup = await Group.bulkCreate(group);
    res.status(201).json(newGroup);
  } catch (error) {
    //Handling any errors that occur
    next(error);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { userId, assignmentStatusId } = req.query;

    await Group.destroy({ where: { userId, assignmentStatusId } });
    console.log(userId, assignmentStatusId);
    res.json({ message: "Member deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
