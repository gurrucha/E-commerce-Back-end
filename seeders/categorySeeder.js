const Category = require("../models/Category");
const categories = ["Grifería", "Tiradores", "Herrajes"];

module.exports = async (mongoose) => {
  await mongoose.connection.dropCollection("categories");
  for (const category of categories) {
    await Category.create({
      name: category,
      products: [],
    });
  }
};
