const express = require("express");
const router = express.Router();
const { resources_table } = require("../db/models");

router.get("/all", async (req, res, next) => {
  try {
    const allResources = await resources_table.findAll();

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

    const resource = await resources_table.findOne({
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
    await resources_table.destroy({ where: { title: req.params.title } });

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
    const updatedResource = await resources_table.update(
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

    const newResource = await resources_table.create({
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
