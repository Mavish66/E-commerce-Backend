const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;

exports.register = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      console.log("Incoming:", req.body); // 👈 Log input
  
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, email, password: hashedPassword });
  
      res.status(201).json({ message: "User Registered Successfullly", user });
    } catch (err) {
      console.error("❌ Registration error:", err); // 👈 Log error
      res.status(500).json({ message: "Server error", error: err.message });
      
    }
  };
  


exports.checkUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(200).json({ exists: true, user });
    } else {
      return res.status(404).json({ exists: false, message: "User not found" });
    }
  } catch (error) {
    console.error("❌ Error checking user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
