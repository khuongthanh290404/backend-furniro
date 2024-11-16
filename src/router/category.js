const express = require("express");
const {
  getAllCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/category");
const { checkAuth } = require("../middlewares/checkout");
const router = express.Router();
router.get("/category", checkAuth, getAllCategory);
router.get("/category/:id", checkAuth, getCategoryById);
router.post("/category", checkAuth, createCategory);
router.put("/category/:id", checkAuth, updateCategory);
router.delete("/category/:id", checkAuth, deleteCategory);

module.exports = router;
