const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const bcrypt = require("bcryptjs");

//creamos nuevo Schema
const userSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  phone: String,
  adress: [],
  orderHistory: [],
  isAdmin: Boolean,
});

// userSchema.pre("save", async function (req, res, next) {
//   const user = this;
//   user.password = await bcrypt.hash(user.password, 10);
//   return next();
// });

//conectamos con la base de datos
const User = mongoose.model("User", userSchema);

module.exports = User;
