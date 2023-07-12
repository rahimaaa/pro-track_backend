const express = require("express");
const cors = require("cors");
const db = require("./db");
require("dotenv").config()
const PORT = process.env.PORT || "8080";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Mount on API
app.use("/api", require("./api"));

// Syncing DB Function
const syncDB = () => db.sync();

// Run server function
const serverRun = () => {
  app.listen(PORT, () => {
    console.log(`Live on port: ${PORT}`);
  });
};

syncDB();
serverRun();

module.exports = app;
