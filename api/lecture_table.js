const express = require("express");
const router = express.Router();
const { lecture_table } = require("../db/models");


//Route handler for the GETAll for all requests
router.get("/all", async (req, res, next) => {
    try { // Retrieve all users from the database
      const allLectures = await lecture_table.findAll();
  
      console.log("these are all the requests: " + allLectures)
  
   // If there are requests, send a response with status code 200 
   //and the Array of Requests
  
     allLectures
        ? res.status(200).json(allLectures)
        //If there are no lectures, send a response with status code 404
  //And error message (No Lectures have been Posted) 
        : res.status(404).send("No Lectures have been Posted");
    } catch (error) {
  
      console.log(error);
  // Log any errors that occur
    }
  });


//Add post route to create new help_request
router.post('/', async (req, res, next) => {
    try { //deconstructing the constructor into the different fields
        const { title, description, recordings, slides, lecture_date, posted_by } = req.body;
  
  // Creating a new user with the provided data
        const newLecture = await lecture_table.create({ title, description, recordings, slides, lecture_date, posted_by });
  
        res.status(201).json(newLecture);
  // Send a response with status code 201 and the newly created help request
    } catch (error) {
  //Handling any errors that occur
        next(error);
    }
  });

  //Delete route to delete a specific lecture with title
  router.delete("/:title", async (req, res, next) => {
    try {
      const single_title = req.params.title;
  
      // Delete the help_request with the provided email from the database
      await lecture_table.destroy({ where: { title: single_title } });
  
      res.json({ message: "Lecture has been Removed Successfully" });
      //Send response message (Lecture has been Removed Successfully)
    } catch (error) {
      //Handling any errors that occur
      next(error);
    }
  });

  //Get route for updating of Help request with the use of stud_email(student email)
router.put("/:title", async (req, res, next) => {
    try {
      //console.log(req.body)
      const { title, description, recordings, slides, lecture_date, posted_by } = req.body;
  
      //Self check
      // Ensure that all required properties exist in the request body
      /*
      if (!stud_email || !request || !status || !ta_email || !accepted) {
        return res.status(400).json({ message: "Missing required fields" });
      } */
  
      // Find the help request to be updated
      const existingLecture = await lecture_table.findOne({
        where: { title: req.params.title },
      });
  
      // If the help request doesn't exist, return a 404 Not Found response
      if (!existingLecture) {
        return res.status(404).json({ message: "lecture not found" });
      }
  
      // Update the help request in the database
      const updatedLecture = await existingLecture.update({
         title, 
         description,
         recordings, 
         slides, 
         lecture_date, 
         posted_by,
      });
  
      // Send a response indicating successful update
      res
        .status(200)
        .json({ message: "Request updated successfully", updatedLecture });
    } catch (error) {
      // Handle any errors that occur
      next(error);
    }
  });


module.exports = router;
