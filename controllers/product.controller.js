const db = require("../models");
const Product = db.Product;
const Category = db.Category;

// Create a product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, categoryId } = req.body;
    const product = await Product.create({ name, description, price, stock, categoryId });
    res.status(201).json(product);
  } catch (error) {
    console.error("❌ Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all products (with categories)
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ include: Category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, { include: Category });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.update(req.body, { where: { id: req.params.id } });
    if (updated[0] === 0) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.destroy({ where: { id: req.params.id } });
    if (deleted === 0) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
