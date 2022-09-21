const Product = require("../models/Product");
const Category = require("../models/Category");

const db = require("../db/dataProducts");
const slugify = require("slugify");

module.exports = async (mongoose) => {
  await mongoose.connection.dropCollection("products");
  for (const product of db) {
    const newProduct = await Product.create({
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description,
      pictures: product.images,
      category: product.categories,
      slug: slugify(product.name, { lower: true }),
    });

    await Category.findOneAndUpdate(
      { name: product.categories },
      {
        $push: { products: newProduct._id },
      },
    );
  }
};
