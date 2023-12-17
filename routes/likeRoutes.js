const express = require("express");
const router = express.Router();
const likeController = require("../controllers/likeController");

router.route("/createLikeOrDisLikeProduct").post(likeController.createLikeOrDisLikeProduct);
router.route("/getAllLikeOrDisLikeByProductId/:id").post(likeController.getAllLikeOrDisLikeByProductId);
router.route("/getAllLikeAndDisLikeProduct").get(likeController.getAllLikeAndDisLikeProduct);
// router.route("/updateLikeAndDisLikeProduct").post(likeController.updateLikeAndDisLikeProduct);

module.exports = router

