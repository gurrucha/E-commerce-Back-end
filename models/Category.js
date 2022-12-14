const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create new scheme
const categorySchema = new Schema({
  name: String,
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

//conect with the database
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
