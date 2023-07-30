const express = require("express");
const router = express.Router();
const { Attendance, User } = require("../db/models");

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
      return res.status(404).json({ error: "Users not found" });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { userId } = req.body;
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
