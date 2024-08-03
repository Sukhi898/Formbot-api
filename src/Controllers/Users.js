const User = require("../Model/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getuser = async (req, res) => {
  try {
    const users = await User.find();
    res.send({ status: "SUCCESS", users });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).send({ status: "FAILED", message: "Something went wrong" });
  }
};

const createLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingCx = await User.findOne({ email });
    if (existingCx) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingCx.password
      );
      if (isPasswordCorrect) {
        const token = jwt.sign({ email: existingCx.email }, "secret", {
          expiresIn: "1hr",
        });
        res.json({
          status: "200",
          token,
          name: existingCx.name,
          id: existingCx._id,
        });
      } else {
        res
          .status(401)
          .json({ status: "FAILED", message: "Incorrect password" });
      }
    } else {
      res.status(404).json({
        status: "FAILED",
        message: "Your email is not registered. Please register it first.",
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send({ status: "FAILED", message: "Something went wrong" });
  }
};

const createUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    const existingCx = await User.findOne({ email });
    if (existingCx) {
      res.json({ message: "User already exists, please try a new email" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        confirmPassword,
        password: hashedPassword,
      });
      await newUser.save();
      res.json({
        status: "201",
        message: "User created successfully",
        user: newUser,
      });
      alert("Registration successful!");
      navigate("/login");
    }
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ status: "FAILED", message: "Something went wrong" });
  }
};

const updateUserDetails = async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newName, newEmail, newPassword } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ status: "FAILED", message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ status: "FAILED", message: "Incorrect old password" });
    }
    if (newName) user.name = newName;
    if (newEmail) user.email = newEmail;
    if (newPassword) user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({
      status: "SUCCESS",
      message: "User details updated successfully",
      user,
    });
  } catch (error) {
    console.error("Update user details error:", error);
    res.status(500).json({ status: "FAILED", message: "Something went wrong" });
  }
};

module.exports = { getuser, createUser, createLogin, updateUserDetails };
