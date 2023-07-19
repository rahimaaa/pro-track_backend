require("dotenv").config();
const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const passport = require("passport");
const LocalStrategy = require("passport-local");
const cors = require("cors");
const db = require("./db");
const { User } = require("./db/models");
const GoogleStrategy = require("passport-google-oidc");

const morgan = require("morgan");
console.log("env:", process.env.GOOGLE_CLIENT_ID);
console.log("env:", process.env.GOOGLE_CLIENT_SECRET);

const PORT = process.env.PORT || "8080";

const sessionStore = new SequelizeStore({ db });

//helper functions
// const serializeUser = (user, done) => done(null, user.id);
// const deserializeUser = (user, done) => {
//   try {
//     console.log(user)
//     // const user = await db.models.User.findByPk(id);
//     done(null, user);
//   } catch (error) {
//     done(error);
//   }
// };

const configSession = () => ({
  secret: "ttp2023summer",
  store: sessionStore,
  resave: false,
  cookie: {
    secure: process.env.NODE_ENV === "dev" ? false : true,
    maxAge: 8 * 60 * 60 * 1000,
  },
});

//middleware
const setUpMiddleware = (app) => {
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(session(configSession()));
  app.use(passport.initialize());
  app.use(passport.session());
  return app;
};

//passport setup
const setUpPassport = () => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, function (
      email,
      password,
      done
    ) {
      User.findOne({ email: email }, function (err, user) {
        console.log("found user", user);
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (!user.correctPassword(password)) {
          return done(null, false);
        }
        console.log("correct password");
        return done(null, user);
      });
    })
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/auth/google/callback",
        passReqToCallback: true,
      },
      authUser
    )
  );

  function authUser(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }

  passport.serializeUser(function (user, done) {
    process.nextTick(function () {
      return done(null, {
        id: user.id,
        email: user.email,
        userType: user.userType,
      });
    });
  });

  passport.deserializeUser(function (user, done) {
    process.nextTick(function () {
      return done(null, user);
    });
  });
};

const setUpRoutes = (app) => {
  app.use("/api", require("./api"));
  app.use("/auth", require("./auth"));
};

const startServer = async (app, PORT) => {
  await db.sync();
  app.listen(PORT, () => console.log(`server is on port: ${PORT}`));
  return app;
};

//configure allfunctions
const configureApp = async (PORT) => {
  const app = express();
  setUpPassport();
  setUpMiddleware(app);
  await sessionStore.sync();
  setUpRoutes(app);
  startServer(app, PORT);
  return app;
};

module.exports = configureApp(PORT);
// const app = express();
// app.use(express.json());
// app.use(morgan("dev"));
// app.use(express.urlencoded({ extended: true }));
// Syncing DB Function
// const syncDB = () => db.sync();

// // Run server function
// const serverRun = () => {
//   app.listen(PORT, () => {
//     console.log(`Live on port: ${PORT}`);
//   });
// };

// syncDB();
// serverRun();
