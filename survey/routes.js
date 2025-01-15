const express = require("express");
const router = express.Router();
const { create, getAll, getOne } = require("./survey.js");
const { userAuth } = require("../middleware/auth");
router.route("/create").post(userAuth, create);
router.route("/surveys").get(userAuth, getAll);
router.route("/get").get(userAuth, getOne);

module.exports = router;
