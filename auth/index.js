const router = require("express").Router();
const { User } = require("../db/models");
const passport = require("passport");
const bcrypt = require("bcrypt");
//auth/login
router.post("/login", async (req, res, next) => {
  console.log("Email:", req.body.email);
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    console.log("User: ", user);
    console.log("Password: ", req.body.password);
    console.log("Correct password", user.password);
    const isCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    console.log("Is Correct Password", isCorrectPassword);
    if (!user || !isCorrectPassword) {
      res.status(401).send("Invalid login attempt");
    } else {
      req.login(user, (err) => (err ? next(err) : res.status(200).json(user)));
    }
  } catch (error) {
    next(error);
  }
});

// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     scope: ["email", "profile"],
//     failureRedirect: "/",
//     successRedirect: "/dashboard",
//   })
// );

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/dashboard",
    failureRedirect: "/",
  })
);

router.post("/signup", async (req, res, next) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    //check for created user
    if (!email || !password) {
      return res.status(400).send("Required fields missing");
    }
    console.log("Checked Required Field");
    const user = await User.create(req.body);
    console.log("User:", user);
    req.login(user, (err) => (err ? next(err) : res.status(200).json(user)));
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(409).send("User already exists");
    } else {
      next(error);
    }
  }
});

router.post("/logout", async (req, res, next) => {
  req.logout((err) => {
    if (error) {
      return next(error);
    }
    res.redirect("/");
  });
});

router.get("/me", async (req, res, next) => {
  console.log("req.user", req.user);
  res.status(200).json(req.user);
});

module.exports = router;
