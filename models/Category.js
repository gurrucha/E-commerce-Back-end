const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create new scheme
const categorySchema = new Schema({
  name: String,
  products: [],
});

//conect with the database
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
