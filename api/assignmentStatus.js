const express = require("express");
const router = express.Router();
const { AssignmentStatus } = require("../db/models");

// Root here is localhost:8080/api/assignmentStatus/all


// router.get("/all", async (req, res, next) => {
//   try { 
//     const allAssignments = await AssignmentStatus.findAll();

//     console.log("these are all the users: " + allAssignments)


//     allAssignments
//       ? res.status(200).json(allAssignments)
      
//       : res.status(404).send("No Assignments Statuses Found");
//   } catch (error) {
//     res.status(500).send('Internal Server Error');
//     //console.log(error);
// // Log any errors that occur
//   }
// });


module.exports = router;