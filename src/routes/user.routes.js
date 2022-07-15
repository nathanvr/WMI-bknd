const router = require("express").Router();
const userController = require("../controllers/user.controller");
const { auth } = require("../utils/auth");

router.route("/signup").post(userController.create);
router.route("/signin").post(userController.signin);

module.exports = router;
