const Product = require("../model/product");
const Category = require("../model/category");
const mongoose = require("mongoose");
module.exports = {
  getAllProduct: async (req, res) => {
    try {
      const data = await Product.find();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ success: false });
    }
  },
  getProductById: async (req, res) => {
    const { id } = req.params;
    if (!id || id.length !== 24) {
      return res.status(400).json({ error: "Invalid product ID" });
    }
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },
  createProduct: async (req, res) => {
    // Tạo sản phẩm trong cơ sở dữ liệu
    try {
      const { name, price, description, image, categoryId } = req.body;

      // Check if `categoryId` is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }

      // Check if the category exists in the database
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(400).json({ message: "Category not found" });
      }

      // Create the product
      const product = await Product.create({
        name,
        price,
        description,
        image,
        categoryId,
      });

      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while creating the product." });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { name, price, description, image } = req.body;
      const data = await Product.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        req.body,
        {
          new: true,
        },
        {
          name,
          price,
          description,
          image,
        }
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ success: false });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const data = await Product.findOneAndDelete({ _id: req.params.id });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ success: false });
    }
  },
};
