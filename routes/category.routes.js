const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");

// Create a category
router.post("/", categoryController.createCategory);

// Get all categories
router.get("/", categoryController.getAllCategories);

// Get category by ID
router.get("/:id", categoryController.getCategoryById);

// Delete a category
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
