const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.route("/getProductByIdUser").get(orderController.getProductByLocation);
router.route("/createOrder").post(orderController.createNewOrder);
router.route("/getAll").get(orderController.getAllProduct);

module.exports = router

