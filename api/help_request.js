const express = require("express");
const router = express.Router();
const { help_request } = require("../db/models");

// Root here is localhost:8080/api/help_request/


//Route handler for the GETAll for all requests
router.get("/all", async (req, res, next) => {
  try { // Retrieve all users from the database
    const allRequests = await help_request.findAll();

    console.log("these are all the users: " + allRequests)

 // If there are requests, send a response with status code 200 
 //and the Array of Requests

   allRequests
      ? res.status(200).json(allRequests)
      //If there are no requests, send a response with status code 404
//And error message (No Request have been Made) 
      : res.status(404).send("No Request have been Made");
  } catch (error) {

    console.log(error);
// Log any errors that occur
  }
});



//Route for getting a specific specific request with student email
router.get('/:email', async (req, res, next) => {
    // Retrieving a specific request by email
    try {req.params.email;
      console.log(req.params)
      const oneRequest = await help_request.findOne({ where: { stud_email: req.params.email }});
  
      if (!help_request) {
    // If the users is not found, send a response with status code 404 
    //And the error message (Users not found)
        return res.status(404).json({ error: 'Request not found' });
      }
    // Sending a response with the retrieved users
      res.json(oneRequest);
    } catch (error) {
  // Pass any error to the error handling
      next(error);
    }
  });


//Exports the router object.
module.exports = router;