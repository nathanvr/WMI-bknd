const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = {
  // Create
  async create(req, res) {
    try {
      const data = req.body;

      const encPassword = await bcrypt.hash(data.password, 8);
      const newUser = { ...data, password: encPassword };
      const user = await User.create(newUser);

      const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
        expiresIn: 60 * 60 * 24,
      });

      res.status(201).json({ message: "User created", data: user });
    } catch (err) {
      res.status(400).json({ message: "User cant be created", data: err });
    }
  },

  async show(req, res) {
    try {
      const id = req.user;
      console.log("este es el id", id);
      const user = await User.findById(id)
        .select("-_id -password")
        .populate({ path: "products" });

      if (!user) {
        throw new Error("Invalid user");
      }

      res.status(200).json({ message: "User found", data: user });
    } catch (err) {
      res.status(400).json({ message: "Can't find the User", data: err });
    }
  },

  //signin
  async signin(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("User or Password incorrect");
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        throw new Error("User or Password incorrect");
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
        expiresIn: 60 * 60 * 24,
      });

      res
        .status(200)
        .json({ message: "User loggin successfully", data: token });
    } catch (err) {
      res.status(400).json({ message: "User cannot loginin", data: err });
    }
  },
  //update
  async update(req, res) {
    try {
      const userId = req.user;
      const user = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
        runValidators: true,
        context: "query",
      });

      res.status(200).json({ message: "User updated", data: user });
    } catch (err) {
      res.status(400).json({ message: "user can't be updated", data: err });
    }
  },
};
