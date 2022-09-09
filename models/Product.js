const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create new scheme
const productSchema = new Schema({
  name: String,
  price: Number,
  stock: Number,
  description: String,
  pictures: [],
  Category: String,
  slug: String,
});

//conect with the database
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
