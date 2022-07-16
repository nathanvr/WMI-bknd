const router = require("express").Router();
const itemOrderController = require("../controllers/itemOrder.controller");
const { auth } = require("../utils/auth");

router.route("/").get(itemOrderController.list);
router.route("/").post(auth, itemOrderController.create);

module.exports = router;
