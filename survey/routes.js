const express = require("express");
const router = express.Router();
const { create, getAll, getOne } = require("./survey.js");
router.route("/create").post(create);
router.route("/surveys").get(getAll);
router.route("/get").get(getOne);

module.exports = router;
