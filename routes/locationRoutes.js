const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationController");

router.route("/addLocation").post(locationController.addLocationController);
router.route("/getAllLocation").get(locationController.getAllLocationController);
router.route("/deleteLocationById/:id").post(locationController.deleteLocationByIdController);
router.route("/getLocationById/:id").post(locationController.getLocationByIdController);

module.exports = router