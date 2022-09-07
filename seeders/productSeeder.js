const Product = require("../models/User");
const db= require("../db/dataProducts")
module.exports = async () => {
  await Product.create({
    name: String,
    price: Number,
    stock: Number,
    description: String,
    pictures: [],
    Category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    slug: String,
  });
};
