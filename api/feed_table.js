const express = require("express");
const router = express.Router();
const { feed_table } = require("../db/models");

//Add post route to create new help_request

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

  //route to delete a specific announcement with stud_email(student email)
router.delete("/:id", async (req, res, next) => {
    try {
      const remove = req.params.id;
  
      // Delete the help_request with the provided email from the database
      await feed_table.destroy({ where: { id: remove } });
  
      res.json({ message: "Request resolved and deleted successfully" });
      //Send response message (Request resolved and deleted successfully)
    } catch (error) {
      //Handling any errors that occur
      next(error);
    }
  });

module.exports = router;
