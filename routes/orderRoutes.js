const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.route("/getAllByLocationSocket").post(orderController.getAllByLocationSocket);
router.route("/createOrder").post(orderController.createNewOrder);
router.route("/getAll").get(orderController.getAllOrder);
router.route("/getAllOrderByLocation").post(orderController.getAllOrderByLocation);
router.route("/getAllOrderByNumberTable").post(orderController.getAllOrderByNumberTable);

module.exports = router

