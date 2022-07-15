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
      res.status(400).json({ message: "User cannot loginin" });
    }
  },
  //update
  async update(req, res) {
    try {
    } catch (err) {
      res.status(400).json({ message: "" });
    }
  },
  //recovery password
  //reset password
  //change password
};