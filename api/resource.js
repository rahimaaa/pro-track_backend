
const axios = require('axios');
const express = require("express");
const router = express.Router();
const { Resource, User } = require("../db/models");
const { isTA } = require("./middleware/isTa");
const { isAdmin } = require("./middleware/isAdmin");

router.get("/all", async (req, res, next) => {
  try {
    const allResources = await Resource.findAll({ include: User });

    if (!allResources) {
      return res.status(404).json({ error: "Resources not found" });
    }

    res.json(allResources);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    req.params.id;

    const resource = await Resource.findOne({
      where: { id: req.params.id },
    });

    if (!resource) {
      return res.status(404).json({ error: "resource not found" });
    }

    res.json(resource);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", isTA, async (req, res, next) => {
  try {
    // const resource = req.params.title;

    // Delete the user with the provided email from the database
    await Resource.destroy({ where: { id: req.params.id } });

    res.json({ message: "resource removed successfully" });
    //Send response message (User removed successfully)
  } catch (error) {
    //Handling any errors that occur
    next(error);
  }
});

router.put("/:id", isTA || isAdmin, async (req, res, next) => {
  try {
    const { title, description, category, content } = req.body;
    const updatedResource = await Resource.update(
      {
        title,
        description,
        category,
        content,
      },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );

    updatedResource
      ? res.status(200).send("resource updated successfully")
      : res.status(404).send("resource Not Found");
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { category, link } = req.body;
//("Its a home run");
   // Fetch link preview data from the API 
    const apiKey = 'b24ea9a6a874078d04f0520fbc361a9b'; // Replace this with your actual API key
    const apiUrl = `https://api.linkpreview.net/?key=${apiKey}&q=${encodeURIComponent(link)}`;
    const response = await axios.get(apiUrl);


    // Extract relevant information from the API response
    const previewData = response.data;
    const {title, description, image } = previewData;
    (title, description, image);

    
    const newResource = await Resource.create({
      title,
      description,
      category,
      link,
      userId : req.user.id,
      image
    });



    const user = await User.findByPk(req.user.id);
    newResource.dataValues.user = user;
    res.status(201).json(newResource);
    //res.sendStatus(200);
  } catch (error) {
    //Handling any errors that occur
    next(error);
  }
});

module.exports = router;
