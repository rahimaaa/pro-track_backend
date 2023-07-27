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
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

const morgan = require("morgan");

const PORT = process.env.PORT || "8080";

const sessionStore = new SequelizeStore({ db });

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
  // app.use(morgan("dev"));
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
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (!user.correctPassword(password)) {
          return done(null, false);
        }
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

  async function authUser(accessToken, refreshToken, profile, done) {
    try {
      // Extract the relevant data from the profile object
      const googleId = profile.id;
      const email = profile.emails ? profile.emails[0].value : null;
      const imageUrl = profile.photos ? profile.photos[0].value : null;
      const firstName = profile.name ? profile.name.givenName : null;
      const lastName = profile.name ? profile.name.familyName : null;

      // Try to find a user with the given Google ID
      // If a user doesn't exist, create a new one
      const [user] = await User.findOrCreate({
        where: { googleId },
        defaults: { email, imageUrl, firstName, lastName },
      });

      // If the user was found or created successfully, call the done function
      // with the user object
      return done(null, user);
    } catch (err) {
      // If an error occurred, call the done function with the error
      done(err);
    }
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

const startServer = async (PORT) => {
  await db.sync();
  server.listen(PORT, () => console.log(`server is on port: ${PORT}`));
  return server;
};

//configure allfunctions
const configureApp = async (PORT) => {
  setUpPassport();
  setUpMiddleware(app);
  await sessionStore.sync();
  setUpRoutes(app);
  startServer(PORT);
  return server;
};

io.on("connection", (socket) => {
  socket.on("addNewRequest", (newRequest) => {
    socket.broadcast.emit("addNewRequest", newRequest);
  });

  socket.on("editRequest", (updatedRequest) => {
    socket.broadcast.emit("editRequest", updatedRequest);
  });

  socket.on("addNewPost", (newFeed) => {
    socket.broadcast.emit("addNewPost", newFeed);
  });
});

module.exports = configureApp(PORT);
