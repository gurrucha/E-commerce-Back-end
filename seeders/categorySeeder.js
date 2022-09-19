const Category = require("../models/Category");
//const Product = require("../models/Product");
const categories = ["Grifería", "Tiradores", "Herrajes"]
//const products = Product.find();

module.exports = async () => {
   for (const category of categories) {
      await Category.create({
         name: category,
         products: [],
      });
   }
};