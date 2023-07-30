const express = require("express");
const router = express.Router();
const { Attendance, User } = require("../db/models");
const { isAdmin } = require("./middleware/isAdmin");
const { use } = require("passport");

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

router.get("/:id", async (req, res, next) => {
  try {
    const user = await Attendance.findOne({ where: { id: req.params.id } });
    if (!user) {
      // If the users is not found, send a response with status code 404
      //And the error message (Users not found)
      return res.status(404).json({ error: "Users not found" });
    }
    // Sending a response with the retrieved users
    res.json(user);
  } catch (error) {
    // Pass any error to the error handling
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { userId } = req.body;
    // const existingUser = await Attendance.findOne({
    //   where: { userId: userId },
    // });
    // if (existingUser) {
    //   return res.status(409).send({ message: "User already exists!" });
    // }
    const newAttendance = await Attendance.create({
      userId: userId,
    });
    console.log(newAttendance);
    res.status(201).json(newAttendance);
  } catch (error) {
    console.log(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const { userId, day, status } = req.body;
    const userAttendance = await Attendance.findOne({
      where: { userId: userId },
      // returning: true,
    });

    // Check if the record exists
    if (!userAttendance) {
      return res.status(404).json({ error: "Attendance record not found" });
    }
    userAttendance[day.toLowerCase()] = status;
    await userAttendance.save();
    res.json({ message: "Attendance updated successfully" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
