const express = require("express");
const router = express.Router();
const { Feed } = require("../db/models");
const { isTA } = require("./middleware/isTa");
//Add post route to create new HelpRequest

router.post("/", isTA, async (req, res, next) => {
  try {
    //deconstructing the constructor into the different fields
    const { title, content, link } = req.body;

    // Creating a new user with the provided data
    const newFeed = await Feed.create({
      title,
      content,
      link,
      //userId,
    });

    res.status(201).json(newFeed);
    // Send a response with status code 201 and the newly created help request
  } catch (error) {
    //Handling any errors that occur
    next(error);
  }
});

//route to delete a specific announcement with stud_email(student email)
router.delete("/:id", isTA,  async (req, res, next) => {
  try {
    const remove = req.params.id;

    // Delete the HelpRequest with the provided email from the database
    await Feed.destroy({ where: { id: remove } });

    res.json({ message: "Request resolved and deleted successfully" });
    //Send response message (Request resolved and deleted successfully)
  } catch (error) {
    //Handling any errors that occur
    next(error);
  }
});

//Route handler for the GETAll for all requests
router.get("/all", async (req, res, next) => {
  try {
    // Retrieve all users from the database
    const allFeeds = await Feed.findAll();

    console.log("these are all the requests: " + allFeeds);

    // If there are requests, send a response with status code 200
    //and the Array of Requests

    allFeeds
      ? res.status(200).json(allFeeds)
      : //If there are no requests, send a response with status code 404
        //And error message (No Request have been Made)
        res.status(404).send("No Request have been Made");
  } catch (error) {
    console.log(error);
    // Log any errors that occur
  }
});

module.exports = router;
