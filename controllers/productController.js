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
  const validCategories = ["Herrajes", "Tiradores", "Grifería"];

  const product = await Product.findOne({ name: req.body.product.name });
  if (product) {
    return res.json(409);
  } else {
    //verify if category exists
    if (!validCategories.includes(req.body.product.category)) {
      return res.json(408);
    } else {
      try {
        const newProduct = new Product({
          name: req.body.product.name,
          price: req.body.product.price,
          stock: req.body.product.stock,
          description: req.body.product.description,
          pictures: [],
          category: req.body.product.category,
          slug: slugify(req.body.product.name, { lower: true }),
        });
        newProduct.save(function (err) {
          if (err) return res.json(404);
          return res.json(200);
        });
      } catch (error) {
        console.log("error")
        return res.json(500);
      }
    }
  }
}

async function update(req, res) {
  const validCategories = ["Herrajes", "Tiradores", "Grifería"];


  let productExists;
  if (req.body.product.name !== req.body.originalName) {
    productExists = await Product.findOne({ name: req.body.product.name });
  }
  if (productExists) {
    return res.json(409);
  } else {
    if (!validCategories.includes(req.body.product.category)) {
      return res.json(408);
    } else {
      try {
        const updateProduct = await Product.findOneAndUpdate({ slug: req.params.slug }, {
          name: req.body.product.name,
          category: req.body.product.category,
          price: req.body.product.price,
          stock: req.body.product.stock,
          description: req.body.product.description,
        });
        updateProduct.save(function (err) {
          if (err) return res.json(404);
          return res.json(200);
        });
      } catch (error) {
        res.status(500);
      }
    }
  }
}

// Remove product from storage (only admin)
async function destroy(req, res) {
  try {
    await Product.findOneAndDelete({ slug: req.params.slug });
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
