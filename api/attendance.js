const express = require("express");
const router = express.Router();
const { Attendance, User } = require("../db/models");
const { isAdmin } = require("./middleware/isAdmin");

router.get("/", async (req, res, next) => {
  try {
    const attendance = await Attendance.findAll({
      include: [
        {
          model: User,
          attributes: ["firstName", "lastName"],
        },
      ],
    });
    attendance
      ? res.status(200).json(attendance)
      : res.status(404).send("No Attendace have been created");
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
