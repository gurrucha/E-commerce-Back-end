const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create new scheme
const orderSchema = new Schema({
  name: String,
  user: {},
  userOrder: String,
  adress: String,
  telephone: String,
  city: String,
  direccion: String,
  //json
  products: String,
  createdAt: String,
});

//conect with the database
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
