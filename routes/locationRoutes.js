const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationController");
const loginLimiter = require("../middleware/loginLimiter");

router.route("/addLocation").post(locationController.addLocation);

router.route("/getAllLocation").get(locationController.getAllLocation);

router.route("/deleteLocation").post(locationController.deleteLocationById);

module.exports = router