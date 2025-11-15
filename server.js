// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./models"); // Sequelize models

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const categoryRoutes = require("./routes/category.routes");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("E-commerce backend is running...");
});

// Database connection and server start
const PORT = process.env.PORT || 5050;

db.sequelize
  .authenticate() // test DB connection
  .then(() => {
    console.log("✅ Database connection established successfully.");

    // Sync models without altering existing tables
    return db.sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Unable to connect to the database:", err);
  });
