const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.route("/getAllByLocationSocket").post(orderController.getAllByLocationSocket);
router.route("/createOrder").post(orderController.createNewOrder);
router.route("/getAll").get(orderController.getAllOrder);
router.route("/getAllOrderByUser").get(orderController.getAllOrderByUser);
router.route("/getAllOrderByLocation").post(orderController.getAllOrderByLocation);
router.route("/getAllOrderByNumberTable").post(orderController.getAllOrderByNumberTable);
router.route("/getAllOrderByNumberTableAndLocationUser").post(orderController.getAllOrderByNumberTableAndLocationUser);
router.route("/deleteOrder").post(orderController.deleteOrder);
router.route("/deleteAllOrder").post(orderController.handleDeleteAllOrder);
router.route("/update/status/:id").post(orderController.handleUpdateStatusOrder);
router.route("/getAllOrderByUserRole").post(orderController.getProductsByRole);

module.exports = router

