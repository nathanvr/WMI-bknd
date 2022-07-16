const { Schema, model, models } = require("mongoose");

const ProductCarSchema = new Schema({
  quantity: {
    type: Number,
    required: true,
  },

  totalAmount: {
    type: Number,
    required: true,
  },

  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
});

const ProductCar = model("ProductCar", ProductCarSchema);
module.exports = ProductCar;
