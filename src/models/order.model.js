const { Schema, model, models } = require("mongoose");

const orderSchema = new Schema(
  {
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: [
          "activated",
          "ordered",
          "accepted",
          "dispatched",
          "delivered",
          "cancelled",
        ],
        message: "Wrong status",
      },
    },

    itemOrders: {
      type: [{ type: Schema.Types.ObjectId, ref: "ItemOrder" }],
      required: false,
    },
  },
  { timestamps: true }
);

const Order = model("Order", orderSchema);
module.exports = Order;
