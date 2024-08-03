const validateUser = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !password || !email) {
    return res.status(400).json({ message: "Please fill all the details" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Please enter a valid email address",
    });
  }

  next();
};

module.exports = validateUser;
