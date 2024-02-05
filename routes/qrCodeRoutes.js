const express = require("express");
const router = express.Router();
const qrCodeController = require("../controllers/qrCodeController");

router.route("/getAll").get(qrCodeController.getAllQrCodeController);
router.route("/add").post(qrCodeController.addListQrCodeByLocationController);

module.exports = router;
