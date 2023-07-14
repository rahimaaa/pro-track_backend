const express = require("express");
const router = express.Router();
const { users } = require("../db/models");

// Root here is localhost:8080/api/users/

//Route handler for the GETAll for allUsers request
router.get("/all", async (req, res, next) => {
  try {
    // Retrieve all users from the database
    const allUsers = await users.findAll();

    console.log("these are all the users: " + allUsers);

    // If there are users, send a response with status code 200
    //and the Array of Users

    allUsers
      ? res.status(200).json(allUsers)
      : //If there are no users, send a response with status code 404
        //And error message (No Users found)
        res.status(404).send("No Users Found");
  } catch (error) {
    console.log(error);
    // Log any errors that occur
  }
});

//Route for get specific user with user email
router.get("/:email", async (req, res, next) => {
  // Retrieving a specific user by email
  try {
    req.params.email;
    console.log(req.params);
    const user = await users.findOne({ where: { email: req.params.email } });

    if (!users) {
      // If the users is not found, send a response with status code 404
      //And the error message (Users not found)
      return res.status(404).json({ error: "Users not found" });
    }
    // Sending a response with the retrieved users
    res.json(user);
  } catch (error) {
    // Pass any error to the error handling
    next(error);
  }
});

//Creation of a new user
router.post("/", async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      imageUrl,
      email,
      password,
      userType,
      cohort_year,
    } = req.body;

    const user = await users.findOne({ where: { email: req.params.email } });
    if (user) {
      return res.json(user);
    }
    // Creating a new user with the provided data
    const newUser = await users.create({
      firstName,
      lastName,
      imageUrl,
      email,
      password,
      userType,
      cohort_year,
    });

    res.status(201).json(newUser);
    // Send a response with status code 201 and the newly created user
  } catch (error) {
    //Handling any errors that occur
    next(error);
  }
});

//Deletion of a User
router.delete("/:email", async (req, res, next) => {
  try {
    const userEmail = req.params.email;

    // Delete the user with the provided email from the database
    await users.destroy({ where: { email: userEmail } });

    res.json({ message: "User removed successfully" });
    //Send response message (User removed successfully)
  } catch (error) {
    //Handling any errors that occur
    next(error);
  }
});

router.put("/:email", async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      imageUrl,
      email,
      password,
      userType,
      cohort_year,
    } = req.body;
    const updateduser = await users.update(
      {
        firstName,
        lastName,
        imageUrl,
        email,
        password,
        userType,
        cohort_year,
      },
      {
        where: { email: req.params.email },
        returning: true,
      }
    );
    // res.status(201).json(updateduser) Alternate to display updated User info
    updateduser
      ? res.status(200).send("user updated successfully")
      : res.status(404).send("user Not Found");
  } catch (error) {
    next(error);
  }
});

//Exports the router object.
module.exports = router;
