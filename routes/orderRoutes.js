const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.route("/getAllByLocationSocket").post(orderController.getAllByLocationSocketController);
router.route("/createOrder").post(orderController.createNewOrderController);
router.route("/getAll").get(orderController.getAllOrderController);
router.route("/getAllOrderByUser").get(orderController.getAllOrderByUserController);
router.route("/getAllOrderByLocation").post(orderController.getAllOrderByLocationController);
router.route("/getAllOrderByNumberTable").post(orderController.getAllOrderByNumberTableController);
router.route("/getAllOrderByNumberTableAndLocationUser").post(orderController.getAllOrderByNumberTableAndLocationUserController);
router.route("/deleteOrder").post(orderController.deleteOrderController);
router.route("/deleteAllOrder").post(orderController.handleDeleteAllOrderController);
router.route("/update/status/:id").post(orderController.handleUpdateStatusOrderController);
router.route("/getAllOrderByUserRole").post(orderController.getProductsByRoleController);

module.exports = router

