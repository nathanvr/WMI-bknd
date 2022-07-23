const Order = require("../models/order.model");
const User = require("../models/user.model");
const ItemOrder = require("../models/itemOrder.model");

module.exports = {
  async create(req, res) {
    try {
      const userId = req.user;
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("Invalid user");
      }

      const { itemOrderId } = req.body;

      const itemOrder = await ItemOrder.findById(itemOrderId);

      const order = await Order.create({
        ...req.body,
      });

      res.status(200).json({ messahe: "Order created", data: order });
    } catch (err) {
      res.status(400).json({ message: "order can't be created", data: err });
    }
  },
};
