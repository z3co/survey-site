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
const PORT = 3000;
app.use("/api/routes", require("./auth/routes.js"));
app.use("/api/surveys", require("./survey/routes.js"));

app.get("/login", (req, res) => res.render("login"));
app.get("/register", (req, res) => res.render("register"));
app.get("/survey", userAuth, (req, res) => res.render("survey"));

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
