const { Product } = require("../models");
const _ = require("lodash");
const slugify = require("slugify");

//Display all products
async function index(req, res) {
  if (!req.query.data) {
    const allProducts = await Product.find();
    return res.json(allProducts);
  } else if (req.query.fndBy === "Category") {
    const products = await Product.find({ category: { $regex: req.query.data } });
    return res.json(products);
  } else if (req.query.fndBy === "Name") {
    //buscar tambien por la descripcion
    const products = await Product.find({ name: { $regex: req.query.data } });
    return res.json(products);
  }
}

//Get a random number of elements
async function getRandom(req, res) {
  if (req.query.slugToAvoid) {
    const allProductsWithoutId = await Product.find({ slug: { $ne: req.query.slugToAvoid } });
    const random = _.sampleSize(allProductsWithoutId, req.query.randomNumber);
    return res.json(random);
  } else {
    const allProducts = await Product.find();
    const random = _.sampleSize(allProducts, req.query.randomNumber);
    return res.json(random);
  }
}

//Show specific product by id through params
async function show(req, res) {
  const product = await Product.findOne({ slug: req.params.slug });
  res.json(product);
}

// Add a new product (only admin)
async function store(req, res) {
  console.log("body", req.body);

  const product = await Product.find({ name: req.body.name });
  if (product) {
    res.json(409);
  }

  const newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
    description: req.body.description,
    pictures: [],
    category: req.body.category,
    slug: slugify(product.name, { lower: true }),
  });
}

// Update any product (only admin)
async function update(req, res) {
  try {
    await Product.findByIdAndUpdate(req.body.product._id, {
      name: req.body.product.name,
      category: req.body.product.category,
      price: req.body.product.price,
      stock: req.body.product.stock,
      description: req.body.product.description,
    });
    res.status(200);
  } catch (error) {
    res.status(500);
  }
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
