const express = require("express");
const router = express.Router();
const notiController = require("../controllers/notifiController");

router.route("/getMessageByLocation").post(notiController.getNotificationData);
router.route("/getMessageByUserRole/:id").post(notiController.getNotificationDataByUserRole);
// router.route("/updateRecordConfirmOrderNotification/:id").post(notiController.updateRecordConfirmOrderNotification);
router.route("/deleteAllNoti").post(notiController.handleDeleteAllNotification);
router.route("/updateRecordNoti").post(notiController.updateRecordNotification);


module.exports = router

