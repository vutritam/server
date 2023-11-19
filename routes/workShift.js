const express = require("express");

const router = express.Router();
const workShifltController = require("../controllers/workShifltController")

// router.use(verifyJWT)
router.route("/add").post(workShifltController.addWorkShift);

module.exports = router;
