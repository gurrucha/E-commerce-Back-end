const Product = require("../models/Product");
const db = require("../db/dataProducts");
const slugify = require("slugify");

module.exports = async () => {
  for (const product of db) {
    await Product.create({
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description,
      pictures: product.images,
      category: product.categories,
      slug: slugify(product.name, { lower: true }),
    });
  }
};
