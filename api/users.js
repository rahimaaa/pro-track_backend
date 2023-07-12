const express = require("express");
const router = express.Router();
const { users } = require("../db/models");

// Root here is localhost:8080/api/shoppers/

router.get("/", async (req, res, next) => {
  try {
    const allUsers = await users.findAll();

    allUsers
      ? res.status(200).json(allUsers) 
      : res.status(404).send("Campus List Not Found"); 
  } catch (error) {
    next(error);
  }
});

module.exports = router;