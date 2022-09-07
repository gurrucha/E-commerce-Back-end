const { Product } = require("../models");

//Display all products
async function showAll(req, res) {
  const allProducts = await Product.find();
  res.json(allProducts);
}

//Display all products of a certain category
async function showByCategory(req, res) {}

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
  showAll,
  showByCategory,
  store,
  update,
  destroy,
};
