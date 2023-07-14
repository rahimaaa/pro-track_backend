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





module.exports = router;