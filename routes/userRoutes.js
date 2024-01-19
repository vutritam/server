const express = require("express");

const router = express.Router();
const usersController = require("../controllers/usersController");
const upload = require("../middleware/verifyUploadFile");
// const verifyJWT = require('../middleware/verifyJWT')
// router.use(verifyJWT)
router.route("/").get(usersController.getAllUsersController);
router.route("/add").post(usersController.createNewUserController);
router.route("/add/admin").post(usersController.createNewAdminController);  
router.route("/").patch(usersController.updateUserController);
router.route("/").delete(usersController.deleteUserController);
router.route("/:id").post(usersController.getUserByIdController);
router.route("/update/password").post(upload.single('file'),usersController.updatePasswordUserController);
router.route("/update/profile").post(upload.single('file'),usersController.updateProfileUserController);

module.exports = router;
