const db = require("../models");
const Category = db.Category;

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    console.error("❌ Error creating category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const result = await Category.destroy({ where: { id: req.params.id } });
    if (result === 0) return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
