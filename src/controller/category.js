const Category = require("../model/category");

module.exports = {
  getAllCategory: async (req, res) => {
    const data = await Category.find();
    res.status(200).json(data);
  },
  getCategoryById: async (req, res) => {
    try {
      const categoryId = req.params.id; // Assuming the ID is passed via the route params
      if (!categoryId) {
        return res.status(400).send("Category ID is required");
      }
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).send("Category not found");
      }
      res.status(200).json(category);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  },
  createCategory: async (req, res) => {
    const data = await Category(req.body).save();
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "category sussess" });
    }
    return res.status(200).json(data);
  },
  updateCategory: async (req, res) => {
    const data = await Category.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json(data);
  },
  deleteCategory: async (req, res) => {
    const data = await Category.findOneAndDelete({ _id: req.params.id });
    res.status(200).json(data);
  },
};
