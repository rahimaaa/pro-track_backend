const express = require("express");
const router = express.Router();
const { Resource } = require("../db/models");

router.get("/all", async (req, res, next) => {
  try {
    const allResources = await Resource.findAll();

    console.log("these are all the resources: " + allResources);

    if (!allResources) {
      return res.status(404).json({ error: "Resources not found" });
    }

    res.json(allResources);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:title", async (req, res, next) => {
  try {
    req.params.title;

    const resource = await Resource.findOne({
      where: { title: req.params.title },
    });

    if (!resource) {
      return res.status(404).json({ error: "resource not found" });
    }

    res.json(resource);
  } catch (error) {
    next(error);
  }
});

router.delete("/:title", async (req, res, next) => {
  try {
    // const resource = req.params.title;

    // Delete the user with the provided email from the database
    await Resource.destroy({ where: { title: req.params.title } });

    res.json({ message: "resource removed successfully" });
    //Send response message (User removed successfully)
  } catch (error) {
    //Handling any errors that occur
    next(error);
  }
});

router.put("/:title", async (req, res, next) => {
  try {
    const { title, description, category, content, posted_by } = req.body;
    const updatedResource = await Resource.update(
      {
        title,
        description,
        category,
        content,
        posted_by,
      },
      {
        where: { title: req.params.title },
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
    const { title, description, category, content, posted_by } = req.body;

    const newResource = await Resource.create({
      title,
      description,
      category,
      content,
      posted_by,
    });

    res.status(201).json(newResource);
  } catch (error) {
    //Handling any errors that occur
    next(error);
  }
});

module.exports = router;
