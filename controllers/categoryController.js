const Category = require("../models/Category");
const Product = require("../models/Product");

async function index(req, res) {
   try {
      const allCategories = await Category.find();
      res.status(200).json(allCategories);

   } catch (error) {
      res.status(400).json({ message: "Error! No category found" })
   }
}

async function show(req, res) {

}
async function showByCategory(req, res) {
   try {
      const allCategories = await Category.findOne({ name: req.params.name }).populate("products");
      res.status(200).json(allCategories);
   } catch (error) {
      res.status(400).json({ message: "Error! No category found" })
   }
}

async function store(req, res) {
}

async function update(req, res) {

   try {
      await Category.findOneAndUpdate({ name: req.params.name }, { name: req.body.newCategoryName });
      const productsCategory = await Product.find({ category: req.params.name })
      productsCategory.map(async (product) => {
         await Product.findByIdAndUpdate(product._id, { category: req.body.newCategoryName })
         const newProd = await Product.findById(product._id);
      })
   } catch (error) {
      res.status(400).json({ message: "Error! No category found" })
   }

}

async function destroy(req, res) {
}

module.exports = {
   index,
   show,
   showByCategory,
   store,
   update,
   destroy,
};
