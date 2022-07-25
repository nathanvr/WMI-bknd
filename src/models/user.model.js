const { Schema, model, models } = require("mongoose");

const emailRegex = new RegExp(
  "[a-z0-9._-]*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?[.])+[a-z0-9]{2,}"
);
const passRegex = new RegExp(
  "(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
);

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      minlength: [2, "lastname too short"],
    },
    lastname: {
      type: String,
      require: true,
      minlength: [2, "lastname too short"],
    },
    email: {
      type: String,
      required: true,
      match: [emailRegex, "invalid email"],
      validate: [
        {
          validator(value) {
            return models.User.findOne({ email: value })
              .then((user) => !user)
              .catch(() => false);
          },
          message: "email already exist",
        },
      ],
    },

    password: {
      type: String,
      required: true,
      match: [passRegex, "password invalid"],
    },

    phone: {
      type: Number,
      required: false,
    },

    city: {
      type: String,
      required: false,
    },

    member: {
      type: Boolean,
    },

    admin: {
      type: Boolean,
    },

    products: {
      type: [{ type: Schema.Types.ObjectId, ref: "Product" }],
      required: false,
    },

    orders: {
      type: [{ type: Schema.Types.ObjectId, ref: "Order" }],
      required: false,
    },
  },
  { timestamp: true }
);

const User = model("User", userSchema);
module.exports = User;
