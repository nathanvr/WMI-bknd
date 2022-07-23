const { Schema, model, models } = require("mongoose");

const ItemOrderSchema = new Schema(
  {
    quantity: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },

    order: { type: Schema.Types.ObjectId, ref: "Order", required: true },
  },
  { timestamps: true }
);

const ItemOrder = model("ItemOrder", ItemOrderSchema);
module.exports = ItemOrder;
