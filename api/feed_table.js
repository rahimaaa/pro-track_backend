const express = require("express");
const router = express.Router();
const { feed_table } = require("../db/models");

//Add post route to create new help_request
/*
router.post("/", async (req, res, next) => {
    try {
      //deconstructing the constructor into the different fields
      const { title, content, link, posted_by } = req.body;
  
      // Creating a new user with the provided data
      const newFeed = await feed_table.create({
        title,
        content,
        link,
        posted_by,
      });
  
      res.status(201).json(newFeed);
      // Send a response with status code 201 and the newly created help request
    } catch (error) {
      //Handling any errors that occur
      next(error);
    }
  });

  */

module.exports = router;
