const express = require("express");
const router = express.Router();
const { users } = require("../db/models");

// Root here is localhost:8080/api/shoppers/


//Route handler for the GETAll for allUsers request
router.get("/", async (req, res, next) => {
  try { // Retrieve all users from the database
    const allUsers = await users.findAll();

    console.log("these are all the users: " + allUsers)

 // If there are users, send a response with status code 200 
 //and the Array of Users

    allUsers
      ? res.status(200).json(allUsers)
      //If there are no users, send a response with status code 404
//And error message (No Users found) 
      : res.status(404).send("No Users Found");
  } catch (error) {

    console.log(error);
// Log any errors that occur
  }
});


//Route for get specific user with user email
router.get('/', async (req, res, next) => {
  // Retrieving a specific user by email
  try {
    const userEmail = parseString(req.params.email);
    console.log(req.params)
    const users = await users.findByPk(userEmail);

    if (!users) {
  // If the users is not found, send a response with status code 404 
  //And the error message (Users not found)
      return res.status(404).json({ error: 'Users not found' });
    }
  // Sending a response with the retrieved users
    res.json(users);
  } catch (error) {
// Pass any error to the error handling
    next(error);
  }
});

//Creation of a new user
router.post('/', async (req, res, next) => {
  try {
      const { firstName, lastName, imageUrl, email, password, userType, cohort_year } = req.body;

// Creating a new user with the provided data
      const newUser = await users.create({ firstName, lastName, imageUrl, email, password, userType, cohort_year });

      res.status(201).json(newUser);
// Send a response with status code 201 and the newly created user
  } catch (error) {
//Handling any errors that occur
      next(error);
  }
});

//Deletion of a User
router.delete('/', async (req, res, next) => {
  try {
    const userEmail = req.params.email;

// Delete the campus with the provided ID from the database
    await users.destroy({ where: { email: userEmail } });

    res.json({ message: 'User removed successfully' });
//Send response message (User removed successfully)
  } catch (error) {

//Handling any errors that occur
    next(error);
  }
});

//Updating a User

router.put('/', async (req, res, next) => {
  try {
    const userEmail = req.params.email;
    const { firstName, lastName, imageUrl, email, password, userType, cohort_year } = req.body;

    // Find the User by email
    const user = await users.findByPk(userEmail);

    if (!users) {
      // If the user is not found, send a response with status code 404 and the error message (User not found)
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user properties with the provided data
      users.firstName = firstName;
      users.lastName = lastName;
      users.imageUrl = imageUrl; 
      users.email = email; 
      users.password = password; 
      users.userType = userType;
      users.cohort_year = cohort_year;
   
    // Save the updated user to the database
    await user.save();

    // Send a response with the updated campus
    res.json(users);
  } catch (error) {
    // Handling any errors that occur
    next(error);
  }
});  

//Exports the router object.
module.exports = router;

/*
router.get("/", async (req, res, next) => {
  try {
    const allUsers = await users.findAll();

    allUsers
      ? res.status(200).json(allUsers) 
      : res.status(404).send("User List Not Found"); 
  } catch (error) {
    next(error);
  }
});

router.post("/AddUser", async (req, res, next) => {
  try {
    const createUser = await users.create(req.body);
    res.status(201).json(createUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
*/