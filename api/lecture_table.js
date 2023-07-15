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


module.exports = router;