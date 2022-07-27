const router = require("express").Router();
const productController = require("../controllers/product.controller");
const { auth } = require("../utils/auth");
const formData = require("../utils/formData");

router.route("/").get(productController.list);
router.route("/:productId").get(productController.show);
router
  .route("/create")
  .post(auth, formData("product-image"), productController.create);
router.route("/update/:productId").put(auth, productController.update);

module.exports = router;
