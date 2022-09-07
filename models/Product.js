const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//creamos nuevo Schema
const productSchema = new Schema({
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

//conect with the database
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
