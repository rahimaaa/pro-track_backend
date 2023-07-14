const express = require("express");
const router = express.Router();
const { assignmentStatus } = require("../db/models");

// Root here is localhost:8080/api/assignmentStatus/all

router.get("/all", async (req, res, next) => {
  try {
    const allAssignments = await assignmentStatus.findAll();

    console.log("these are all the users: " + allAssignments);

    allAssignments
      ? res.status(200).json(allAssignments)
      : res.status(404).send("No Assignments Statuses Found");
  } catch (error) {
    res.status(500).send("Internal Server Error");
    //console.log(error);
    // Log any errors that occur
  }
});

router.put("/:email/:assignmentId/status", async (req, res, next) => {
  try {
    const { status } = req.body;
    const { email, assignmentId } = req.params;
     
    const updatedStatus = await assignmentStatus.update(
      { status },
      {
        where: { email, assignmentId },
        returning: true,
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


//Add post route to create new help_request
router.post("/", async (req, res, next) => {
  try {
    //deconstructing the constructor into the different fields
    const { stud_email, request, status, ta_email, accepted } = req.body;

    // Creating a new user with the provided data
    const newRequest = await help_request.create({
      stud_email,
      request,
      status,
      ta_email,
      accepted,
    });

    res.status(201).json(newRequest);
    // Send a response with status code 201 and the newly created help request
  } catch (error) {
    //Handling any errors that occur
    next(error);
  }
});

module.exports = router;
