const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.route("/getProductByIdUser/:id").get(orderController.getProductByUserId);
router.route("/createOrder").post(orderController.createNewOrder);

module.exports = router