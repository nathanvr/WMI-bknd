const User = require("../models/user.model");
const Product = require("../models/product.model");

module.exports = {
  async list(req, res) {
    try {
      const products = await Product.find();
      res.status(200).json({ message: "Products found", data: products });
    } catch (err) {
      res.status(400).json({ message: "cant find Products", data: err });
    }
  },

  async show(req, res) {
    try {
      const { productId } = req.params;
      const product = await Product.findById(productId);
      res.status(200).json({ message: "Product found", data: product });
    } catch (err) {
      res.status(400).json({ message: "Can't find the Product", data: err });
    }
  },

  async create(req, res) {
    try {
      const id = req.user;
      const user = await User.findById(id);

      if (!user) {
        throw new Error("Invalid user");
      }
      const product = await Product.create({
        ...req.body,
        userId: user._id,
      });

      await user.products.push(product);
      await user.save({ validateBeforeSave: false });
      res
        .status(201)
        .json({ message: "Product creates successfully", data: product });
    } catch (err) {
      res.status(400).json({ message: "Product can't be created", data: err });
    }
  },

  async update(req, res) {
    try {
      const { productId } = req.params;
      const userId = req.user;
      const user = await User.findById(userId);

      if (!user) {
        throw new Error("Invalid user");
      }

      const product = await Product.findByIdAndUpdate(productId, req.body, {
        new: true,
        runValidators: true,
        context: "query",
      });
      res.status(200).json({ message: "Product updated", data: product });
    } catch (err) {
      res.status(400).json({ message: "Product cant be updated", data: err });
    }
  },
};
