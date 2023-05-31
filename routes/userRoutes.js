const express = require("express");

const router = express.Router();
const usersController = require("../controllers/usersController");
// const verifyJWT = require('../middleware/verifyJWT')
// router.use(verifyJWT)
router.route("/").get(usersController.getAllUsers);
router.route("/").post(usersController.createNewUser);
router.route("/").patch(usersController.updateUser);
router.route("/").delete(usersController.deleteUser);
router.route("/:id").post(usersController.getUserById);

module.exports = router;
