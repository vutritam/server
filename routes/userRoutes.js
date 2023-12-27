const express = require("express");

const router = express.Router();
const usersController = require("../controllers/usersController");
// const verifyJWT = require('../middleware/verifyJWT')
// router.use(verifyJWT)
router.route("/").get(usersController.getAllUsersController);
router.route("/add").post(usersController.createNewUserController);
router.route("/").patch(usersController.updateUserController);
router.route("/").delete(usersController.deleteUserController);
router.route("/:id").post(usersController.getUserByIdController);

module.exports = router;
