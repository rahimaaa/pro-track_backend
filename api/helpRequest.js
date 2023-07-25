const express = require("express");
const router = express.Router();
const { HelpRequest, User } = require("../db/models");

// Root here is localhost:8080/api/HelpRequest/

//Route handler for the GETAll for all requests
router.get("/", async (req, res, next) => {
  try {
    // Retrieve all users from the database
    const allRequests = await HelpRequest.findAll({
      include: [
        {
          model: User,
          as: "student",
        },
        {
          model: User,
          as: "ta",
        },
      ],
    });

    // If there are requests, send a response with status code 200
    //and the Array of Requests

    allRequests
      ? res.status(200).json(allRequests)
      : //If there are no requests, send a response with status code 404
        //And error message (No Request have been Made)
        res.status(404).send("No Request have been Made");
  } catch (error) {
    console.log(error);
    // Log any errors that occur
  }
});

//Route for getting a specific specific request with student email
router.get("/:id", async (req, res, next) => {
  // Retrieving a specific request by email
  try {
    req.params.id;
    const oneRequest = await HelpRequest.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: User,
          as: "student",
        },
        {
          model: User,
          as: "ta",
        },
      ],
    });

    if (!HelpRequest) {
      // If the users is not found, send a response with status code 404
      //And the error message (Users not found)
      return res.status(404).json({ error: "Request not found" });
    }
    // Sending a response with the retrieved users
    res.json(oneRequest);
  } catch (error) {
    // Pass any error to the error handling
    next(error);
  }
});

//route to delete a specific help request with stud_email(student email)
router.delete("/:id", async (req, res, next) => {
  try {
    const studentId = req.params.id;

    // Delete the HelpRequest with the provided email from the database
    await HelpRequest.destroy({ where: { id: studentId } });

    res.json({ message: "Request resolved and deleted successfully" });
    //Send response message (Request resolved and deleted successfully)
  } catch (error) {
    //Handling any errors that occur
    next(error);
  }
});

//Get route for updating of Help request with the use of stud_email(student email)
router.put("/:id", async (req, res, next) => {
  try {
    const { studentId, request, status, taId, accepted } = req.body;

    //Self check
    // Ensure that all required properties exist in the request body
    // if (!studentId || !request || !status || !accepted) {
    //   return res.status(400).json({ message: "Missing required fields" });
    // }

    // Find the help request to be updated
    const existingRequest = await HelpRequest.findOne({
      where: { id: req.params.id },
    });

    // If the help request doesn't exist, return a 404 Not Found response
    if (!existingRequest) {
      return res.status(404).json({ message: "Help request not found" });
    }

    // Update the help request in the database
    const updatedRequest = await existingRequest.update({
      studentId,
      request,
      status,
      taId,
      accepted,
    });
    // Send a response indicating successful update
    const ta = await User.findByPk(taId);
    updatedRequest.dataValues.ta = ta;
    const student = await User.findByPk(studentId);
    updatedRequest.dataValues.student = student;
    res
      .status(200)
      .json({ message: "Request updated successfully", updatedRequest });
  } catch (error) {
    // Handle any errors that occur
    next(error);
  }
});

//Add post route to create new HelpRequest
router.post("/", async (req, res, next) => {
  try {
    //deconstructing the constructor into the different fields
    const { studentId, request, status, accepted } = req.body;
    // Creating a new user with the provided data
    const newRequest = await HelpRequest.create({
      studentId,
      request,
      status,
      //taId
      accepted,
    });

    const student = await User.findByPk(studentId);
    newRequest.dataValues.student = student;
    res.status(201).json(newRequest);
    // Send a response with status code 201 and the newly created help request
  } catch (error) {
    //Handling any errors that occur
    next(error);
  }
});

//Exports the router object.
module.exports = router;
