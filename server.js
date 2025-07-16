const express = require("express");
const cors = require("cors");
// require("dotenv").config();
require("dotenv").config();
const db = require("./models"); // ✅ Sequelize models check once import

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Auth routes
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("E-commerce backend is running...");
});

const productRoutes = require("./routes/product.routes");
const categoryRoutes = require("./routes/category.routes");

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);




// ✅ Sequelize sync and THEN start the server
const PORT = process.env.PORT || 5050;
db.sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
