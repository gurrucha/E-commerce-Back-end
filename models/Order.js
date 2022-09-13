const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create new scheme
const orderSchema = new Schema({
  name: String,
  user: String,
  companyName: String,
  adress: String,
  city: String,
  postalCode: String,
  telephone: String,
  mail: String,
  additionalDescription: String,
  products: [],
  createdAt: String,
});

//conect with the database
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
