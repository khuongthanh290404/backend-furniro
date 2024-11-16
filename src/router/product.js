const express = require("express");
const {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} = require("../controller/product");
const { checkAuth } = require("../middlewares/checkout");

const router = express.Router();
router.get("/products",checkAuth ,getAllProduct);
router.get("/products/:id", checkAuth,getProductById);
router.post("/products", checkAuth,createProduct);
router.put("/products/:id", checkAuth,updateProduct);
router.delete("/products/:id", checkAuth,deleteProduct);

module.exports = router;
