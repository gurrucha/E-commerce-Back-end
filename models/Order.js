const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//creamos nuevo Schema
const orderSchema = new Schema({
  name: String,
  user: {},
  userOrder: String,
  adress: String,
  //json
  products: String,
  createdAt: String,
});

//conect with the database
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
