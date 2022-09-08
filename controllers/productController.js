const { Product } = require("../models");

//Display all products
async function index(req, res) {
  if (!req.query.category) {
    const allProducts = await Product.find();
    return res.json(allProducts);
  } else {
    const products = await Product.find({ Category: { $regex: req.query.category } });
    return res.json(products);
  }
}

//Display all products of a certain category
async function show(req, res) {}

// Add a new product (only admin)
async function store(req, res) {
  //validate if user is admin
}

// Update any product (only admin)
async function update(req, res) {
  //validate if user is admin
}

// Remove product from storage (only admin)
async function destroy(req, res) {
  //validate if user is admin
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
