const express = require("express");
const router = express.Router();
const { help_request } = require("../db/models");

// Root here is localhost:8080/api/help_request/


//Route handler for the GETAll for all requests
router.get("/all", async (req, res, next) => {
  try { // Retrieve all users from the database
    const allRequests = await help_request.findAll();

    console.log("these are all the requests: " + allRequests)

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


//route to delete a specific help request with stud_email(student email)
  router.delete('/:stud_email', async (req, res, next) => {
    try { 
      const student_email = req.params.stud_email;
  
  // Delete the help_request with the provided email from the database
      await help_request.destroy({ where: { stud_email: student_email } });
  
      res.json({ message: 'Request resolved and deleted successfully' });
  //Send response message (Request resolved and deleted successfully)
    } catch (error) {
  
  //Handling any errors that occur
      next(error);
    }
  });

//Get route for updating of Help request with the use of stud_email(student email)
  router.put("/:stud_email", async (req, res, next) => {
    try { //console.log(req.body)
      const { stud_email, request, status, ta_email, accepted } = req.body;
  
      //Self check
      // Ensure that all required properties exist in the request body
      if (!stud_email || !request || !status || !ta_email || !accepted) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      // Find the help request to be updated
      const existingRequest = await help_request.findOne({ where: { stud_email: req.params.stud_email } });
  
      // If the help request doesn't exist, return a 404 Not Found response
      if (!existingRequest) {
        return res.status(404).json({ message: 'Help request not found' });
      }
  
      // Update the help request in the database
      const updatedRequest = await existingRequest.update({
        stud_email,
        request,
        status,
        ta_email,
        accepted,
      });
  
      // Send a response indicating successful update
      res.status(200).json({ message: 'Request updated successfully', updatedRequest });
    } catch (error) {
      // Handle any errors that occur
      next(error);
    }
  });
  



//Exports the router object.
module.exports = router;