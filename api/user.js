const express = require("express");
const router = express.Router();
const { User } = require("../db/models");
const { isAdmin } = require("./middleware/isAdmin");

// Root here is localhost:8080/api/users/

//Route handler for the GETAll for allUsers request
router.get("/all", isAdmin, async (req, res, next) => {
  try {
    // Retrieve all users from the database
    const allUsers = await User.findAll();

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
router.get("/:id", async (req, res, next) => {
  // Retrieving a specific user by email
  try {
    const user = await User.findOne({ where: { id: req.params.id } });

    if (!user) {
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
    const { email } = req.body;

    const user = await User.findOne({ where: { email: email } });
    if (user) {
      return res.json(user);
    }
    // Creating a new user with the provided data
    const newUser = await User.create(req.body);

    return res.status(201).json(newUser);
    // Send a response with status code 201 and the newly created user
  } catch (error) {
    //Handling any errors that occur
    next(error);
  }
});

//Deletion of a User
router.delete("/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Delete the user with the provided email from the database
    await User.destroy({ where: { id: userId } });

    res.json({ message: "User removed successfully" });
    //Send response message (User removed successfully)
  } catch (error) {
    //Handling any errors that occur
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
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
    const updateduser = await User.update(
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
        where: { id: req.params.id },
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
