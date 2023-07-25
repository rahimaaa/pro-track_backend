const express = require("express");
const router = express.Router();
const { Zoom } = require("../db/models");
const { isTA } = require("./middleware/isTa");

router.get("/all", async (req, res, next) => {
  try {
    // Retrieve all users from the database
    const allZoom = await Zoom.findAll();

    console.log("these are all the zooms: " + allZoom);

    // If there are requests, send a response with status code 200
    //and the Array of Requests

    allZoom
      ? res.status(200).json(allZoom)
      : //If there are no lectures, send a response with status code 404
        //And error message (No Lectures have been Posted)
        res.status(404).send("No zoom have been Posted");
  } catch (error) {
    console.log(error);
    // Log any errors that occur
  }
});

router.get("/:id", async (req, res, next) => {
  // Retrieving a specific user by email
  try {
    req.params.id;
    console.log(req.params);
    const zoomLink = await Zoom.findOne({ where: { id: req.params.id } });

    if (!zoomLink) {
      // If the users is not found, send a response with status code 404
      //And the error message (Users not found)
      return res.status(404).json({ error: "Zoom link not found" });
    }
    // Sending a response with the retrieved users
    res.json(zoomLink);
  } catch (error) {
    // Pass any error to the error handling
    next(error);
  }
});

router.put("/:id",  async (req, res, next) => {
  try {
    const { info, link } = req.body;
    const existingZoom = await Zoom.findOne({
        where: { id: req.params.id },
      });
    const updatedZoom = await existingZoom.update({
        info,
        link,
      });
  
      // Send a response indicating successful update
      res
        .status(200)
        .json({ message: "Request updated successfully", updatedZoom });
  } catch (error) {
    //Handling any errors that occur
    next(error);
  }
});

router.post("/",  async (req, res, next) => {
  try {
    const { info, link } = req.body;

    const newZoom = await Zoom.create({
      info,
      link,
    });

    return res.status(201).json(newZoom);
    // Send a response with status code 201 and the newly created user
  } catch (error) {
    //Handling any errors that occur
    next(error);
  }
});

router.delete("/:id",  async (req, res, next) => {
    try {
      const zoom = req.params.id;
  
      // Delete the HelpRequest with the provided email from the database
      await Zoom.destroy({ where: { id: zoom } });
  
      res.json({ message: "Lecture has been Removed Successfully" });
      
    } catch (error) {
      //Handling any errors that occur
      next(error);
    }
  });

module.exports = router;
