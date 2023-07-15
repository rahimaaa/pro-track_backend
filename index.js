const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const passport = require("passport");
const cors = require("cors");
const db = require("./db");

const morgan = require("morgan");
require("dotenv").config();
const PORT = process.env.PORT || "8080";

const sessionStore = new SequelizeStore({ db });

//helper functions
const serializeUser = (user, done) => done(null, user.id);
const deserializeUser = async (user, done) => {
  try {
    const user = await db.models.user.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
};

const configSession = () => ({
  secret: "ttp2023summer",
  store: sessionStore,
  resave: false,
  cookie: {
    maxAge: 8 * 60 * 60 * 1000,
  },
});

//middleware
const setUpMiddleware = (app) => {
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(session(configSession()));
  app.use(passport.initialize());
  app.use(passport.session());
  return app;
};

//passport setup
const setUpPassport =() => {
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser)
}

const setUpRoutes = (app) => {
  app.use("/api", require("./api"));
app.use("/auth", require("./auth"));
}


const startServer = async (app, PORT)=>{
  await db.sync()
  app.listen(PORT, () => console.log(`server is on port: ${PORT}`))
  return app;
};

//configure allfunctions
const configureApp = async (PORT)=> {
  const app = express();
  setUpPassport();
  setUpMiddleware(app);
  await sessionStore.sync();
  setUpRoutes(app);
  return startServer(app, PORT);

}



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
