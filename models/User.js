const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

//Create new scheme
const userSchema = new Schema({
  firstname: { type: String },
  lastname: { type: String },
  username: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String },
  adress: [],
  orderHistory: [],
  isAdmin: Boolean,
});

// HOOK TO VALIDATE PASSWORD
userSchema.pre("save", async function (req, res, next) {
  const user = this;

  user.password = await bcrypt.hash(user.password, 8);
  return next();
});

//conectamos con la base de datos
const User = mongoose.model("User", userSchema);

module.exports = User;
