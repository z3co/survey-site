const express = require("express");
const router = express.Router();
const { create } = require("./survey.js");
router.route("/create").post(create);

module.exports = router
