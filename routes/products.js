const express = require("express");

const router = express.Router();
const productController = require("../controllers/productController")
const verifyJWT = require('../middleware/verifyJWT');
const upload = require("../middleware/verifyUploadFile");

router.route("/").get(productController.getAllProductController);
router.route("/add").post(upload.single('file'),productController.createProductController);
router.route("/filterByCondition").post(productController.getProductFilterByConditionController);

module.exports = router;
