const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const app = express();
const cookieParser = require("cookie-parser");
app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());
const PORT = 3000;
app.use("/api/routes", require("./auth/routes.js"));

const Server = app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
	console.error("Unhandled rejection", err.message);
	Server.close(() => {
		process.exit(1);
	});
});
