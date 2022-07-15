const { Schema, model, models } = require("mongoose");

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: {
        values: [
          "vegetarian",
          "vegan",
          "fastfood",
          "fitness",
          "italian",
          "seafood",
          "regional",
        ],
        message: "Wrong Category",
      },
    },

    priceUnit: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    maxQty: {
      type: Number,
      required: true,
    },

    available: {
      type: Boolean,
      required: true,
    },

    userId: { type: Schema.Types.ObjectId, ref: "User", require: true },

    // productCars: {
    //   type: [{ type: Schema.Types.ObjectId, ref: "ProductCar" }],
    //   required: false,
    // },
  },

  { timestamps: true }
);

const Product = model("Product", ProductSchema);
module.exports = Product;
