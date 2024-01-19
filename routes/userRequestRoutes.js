const express = require("express");
const router = express.Router();
const usersRequestController = require("../controllers/userRequestController");

router.route("/update/request").post(usersRequestController.updateIsChangeRequestUserController);
router.route("/request").get(usersRequestController.getAllRequestUserController);
router.route("/approve").post(usersRequestController.approvedRequestForUserController);

module.exports = router;
