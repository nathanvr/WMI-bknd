const Product = require("../models/product.model");
const ItemOrder = require("../models/itemOrder.model");
const User = require("../models/user.model");
const Order = require("../models/order.model");

module.exports = {
  async create(req, res) {
    try {
      const { productId, orderId } = req.query;
      const userId = req.user;
      const user = await User.findById(userId);

      if (!user) {
        throw new Error("Invalid user");
      }
      // si la orden no existe falla
      const order = await Order.findById(orderId);

      // si wl producto no existe falla

      const itemOrder = await ItemOrder.create({
        ...req.body,
        product: productId,
        order: orderId,
      });

      order.itemOrders.push(itemOrder);
      await order.save({ validateBeforeSave: false });

      res.status(200).json({ message: "product car created", data: itemOrder });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Product-car can't be created", data: err });
    }
  },

  async list(req, res) {
    try {
      const itemOrders = await ItemOrder.find();
      res.status(200).json({ message: "item order found", data: itemOrders });
    } catch (err) {
      res.status(400).json({ message: "Can't find item order", data: err });
    }
  },

  // async update(req, res) {
  //   try {
  //     const {productCarId}

  //   } catch (err) {
  //     res
  //       .status(400)
  //       .json({ message: "Product-car cant be updated", data: err });
  //   }
  // },
};
