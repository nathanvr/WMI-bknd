const router = require("express").Router();
const orderController = require("../controllers/order.controller");
const { auth } = require("../utils/auth");

router.route("/").post(auth, orderController.create);

module.exports = router;
