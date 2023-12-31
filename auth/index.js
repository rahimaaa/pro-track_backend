const router = require("express").Router();
const { User } = require("../db/models");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { cookie } = require("../config");

//auth/login

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    const isCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
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
    //successRedirect: "http://localhost:3000/dashboard",
    failureRedirect: "/",
  }),
  function (req, res, next) {
    // Successful authentication, redirect home.
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
    // res.redirect("https://www.google.com");
  }
);

router.post("/signup", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //check for created user
    if (!email || !password) {
      return res.status(400).send("Required fields missing");
    }
    const user = await User.create(req.body);
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
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    req.session.destroy((error) => {
      if (error) {
        return next(error);
      }
      // res.clearCookie("connect.sid");
      res.clearCookie("connect.sid", { ...cookie, maxAge: 0 });
      res.sendStatus(204);
    });
  });
});

router.get("/me", async (req, res, next) => {
  res.status(200).json(req.user);
});

module.exports = router;
