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
    //buscar tambien por la descripcion
    const products = await Product.find({ name: { $regex: req.query.data } });
    return res.json(products);
  }
}

//Get a random number of elements
async function getRandom(req, res) {
  const allProducts = await Product.find({ slug: { $ne: req.query.slugToAvoid } });
  //TIP-to implement: bring number by query instead
  const random = _.sampleSize(allProducts, 3);
  res.json(random);
}

//Show specific product by id through params
async function show(req, res) {
  const product = await Product.findOne({ slug: req.params.slug });
  res.json(product);
}

// Add a new product (only admin)
async function store(req, res) {
  //validate if user is admin
}

// Update any product (only admin)
async function update(req, res) {
  console.log("product incoming", req.body);
  const newProd= await Product.findById(req.body._id)
  const newProd1 = await Product.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    stock: req.body.stock,
  });
  console.log("new prod", newProd);
}

// Remove product from storage (only admin)
async function destroy(req, res) {
  try {
    await Product.findByIdAndDelete(req.params.id);
  } catch (error) {
    res.status(500);
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
  getRandom,
};
