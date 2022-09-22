const Category = require("../models/Category");
//const Product = require("../models/Product");
const categories = ["Grifería", "Tiradores", "Herrajes"];
//const products = Product.find();

module.exports = async (mongoose) => {
  await mongoose.connection.dropCollection("categories");
  for (const category of categories) {
    await Category.create({
      name: category,
      products: [],
    });
  }
};
