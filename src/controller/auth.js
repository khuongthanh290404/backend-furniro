const User = require("../model/auth");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
module.exports = {
  Register: async (req, res) => {
    try {
      const { username, phone, email, password } = req.body;

      // Check if all required fields are provided
      if (!username || !phone || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
      }

      // Check if the email already exists
      const existUser = await User.findOne({ email: email });
      if (existUser) {
        return res.status(200).json({ message: "Email đã tồn tại" });
      }

      // Hash the password
      const hashPassword = await bcryptjs.hash(password, 10);

      // Create and save the user
      const user = await new User({
        username,
        phone,
        email,
        password: hashPassword,
      }).save();

      res.status(200).json({ message: "Đăng ký thành công", user: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  Login: async (req, res) => {
    const { email, password } = req.body;
    const exisUser = await User.findOne({ email: email });
    if (!exisUser) {
      return res.status(400).json({ message: "email ko ton tai" });
    }
    const validPassword = await bcryptjs.compare(password, exisUser.password);
    if (!validPassword) {
      return res.status(400).json({ message: "mat khau ko đúng" });
    }
    const token = jwt.sign({ id: exisUser._id }, "123456", { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true });
    exisUser.password = undefined;
    res
      .status(200)
      .json({ message: "đăng nhập thành công", user: exisUser, token });
  },
  getUser: async (req, res) => {
    const data = await User.find();
    res.status(200).json(data);
  },
  deleteUser: async (req, res) => {
    const data = await User.findOneAndDelete({ _id: req.params.id });
    res.status(200).json(data);
  },
};
