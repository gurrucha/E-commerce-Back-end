const Category = require("../models/Category");
const Product = require("../models/Product");
const categories = ["Grifería", "Tiradores", "Herrajes"]
const products = Product.find();

module.exports = async () => {
   const allProducts = await products;
   for (const category of categories) {
      const productsWithCategory = allProducts.filter((product) => {
         return product.category === category;
      })
      await Category.create({
         name: category,
         products: productsWithCategory,
      });
   }
};