const express = require("express");
const router = express.Router();
const { Resource, User} = require("../db/models");
const { isTA } = require("./middleware/isTa");

router.get("/all", async (req, res, next) => {
  try {
    const allResources = await Resource.findAll({include: User});

    console.log("these are all the resources: " + allResources);

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

router.delete("/:id", isTA,  async (req, res, next) => {
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

router.put("/:id", isTA, async (req, res, next) => {
  try {
    const { title, description, category, content } = req.body;
    const updatedResource = await Resource.update(
      {
        title,
        description,
        category,
        content
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

router.post("/", isTA, async (req, res, next) => {
  try {
    const { title, description, category, content } = req.body;

    const newResource = await Resource.create({
      title,
      description,
      category,
      content
    });

    res.status(201).json(newResource);
  } catch (error) {
    //Handling any errors that occur
    next(error);
  }
});

module.exports = router;
