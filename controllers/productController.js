const { Product } = require("../models");
const _ = require("lodash");

//Display all products
async function index(req, res) {
  if (!req.query.data) {
    const allProducts = await Product.find();
    return res.json(allProducts);
  } else if (req.query.fndBy === "Category") {
    const products = await Product.find({ Category: { $regex: req.query.data } });
    return res.json(products);
  } else if (req.query.fndBy === "Name") {
    const products = await Product.find({ name: { $regex: req.query.data } });
    return res.json(products);
  }
}

//Get a random number of elements
async function getRandom(req, res) {
  const allProducts = await Product.find({ _id: { $ne: req.query.idToAvoid } });
  //TIP-to implement: bring number by query instead
  const random = _.sampleSize(allProducts, 3);
  res.json(random);
}

//Show specific product by id through params
async function show(req, res) {
  console.log(req.params);
  const product = await Product.findById(req.params.id);
  res.json(product);
}

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
  getRandom,
};
