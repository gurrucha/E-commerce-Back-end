const Product = require("../models/Product");
const db = require("../db/dataProducts");

module.exports = async () => {
  for (const product of db) {
    await Product.create({
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description,
      pictures: product.images,
      Category: product.categories,
      slug: product.name,
    });
  }
};
