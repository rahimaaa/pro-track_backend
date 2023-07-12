const express = require("express");
const router = express.Router();
const { users } = require("../db/models");

// Root here is localhost:8080/api/shoppers/

router.get("/", async (req, res, next) => {
  try {
    const allUsers = await users.findAll();

    allUsers
      ? res.status(200).json(allUsers) 
      : res.status(404).send("User List Not Found"); 
  } catch (error) {
    next(error);
  }
});

router.post("/AddUser", async (req, res, next) => {
  try {
    const createUser = await users.create(req.body);
    res.status(201).json(createUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;