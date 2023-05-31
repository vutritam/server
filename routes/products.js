const express = require("express");

const router = express.Router();
const productController = require("../controllers/productController")
const verifyJWT = require('../middleware/verifyJWT');
const upload = require("../middleware/verifyUploadFile");
// router.use(verifyJWT)
router.route("/").get(productController.getAllProduct);
router.route("/add").post(upload.single('file'),productController.createProduct);

module.exports = router;
