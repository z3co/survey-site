const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const app = express();
const cookieParser = require("cookie-parser");
app.set("view engine", "ejs");
const { userAuth } = require("./middleware/auth");
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "scripts")));
app.use("/favicon.ico", express.static("images/favicon.ico"));
const PORT = 3000;
app.use("/api/routes", require("./auth/routes.js"));
app.use("/api/surveys", require("./survey/routes.js"));

app.get("/", (req, res) => res.render("login"));
app.get("/surveyname", userAuth, (req, res) => res.render("surveyName"));
app.get("/login", (req, res) => res.render("login"));
app.get("/register", (req, res) => res.render("register"));
app.get("/survey", userAuth, (req, res) => res.render("survey"));
app.get("/answer", userAuth, (req, res) => res.render("answer"));
app.get("/search", userAuth, (req, res) => res.render("search"));

// If no route matches the url we send them a 404 page
app.use((req, res, next) => {
  res.status(404).render("404");
});

const Server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection", err.message);
  Server.close(() => {
    process.exit(1);
  });
});

module.exports = app;
