const { Order } = require("../models");
const { User } = require("../models");
const { Product } = require("../models");

// Display orders of user.
async function index(req, res) {
  try {
    const allOrders = await Order.find();
    res.status(200).json(allOrders);
  } catch (error) {
    res.status(404);
  }
}

// Store a new order in storage and in the specified user.
async function store(req, res) {
  //format the data for when the product was created
  const today = new Date();
  const formattedToday = (new Intl.DateTimeFormat('en-US').format(today));

  let stockValid = true;
  const prodOutOfStock = []

  //validate stock
  for (const product of (req.body.order.products)) {
    const findProduct = await Product.findById(product.product._id)
    if ((findProduct.stock - product.cant) < 0) {
      stockValid = false;
      prodOutOfStock.push({ name: findProduct.name, stockLeft: findProduct.stock, picture: findProduct.pictures[1] })
    }
  }
  if (stockValid) {
    const newOrder = new Order({
      name: req.body.order.name,
      user: req.auth.id,
      companyName: req.body.order.companyName,
      adress: req.body.order.adress,
      city: req.body.order.city,
      postalCode: req.body.order.postalCode,
      telephone: req.body.order.telephone,
      mail: req.body.order.mail,
      additionalDescription: req.body.order.additionalDescription,
      products: req.body.order.products,
      totalPrice: req.body.totalPrice,
      createdAt: formattedToday,
    });

    await User.findByIdAndUpdate(req.auth.id, {
      $push: { orderHistory: newOrder },
    });

    for (const product of (req.body.order.products)) {
      const findProduct = await Product.findById(product.product._id)
      const newStock = findProduct.stock - product.cant;
      await Product.findByIdAndUpdate(product.product._id, {
        $set: { stock: newStock }
      });
    }
    newOrder.save(function (err) {
      if (err) return res.status(404).json({ message: "Problem with saving it in the database" });
      return res.status(200).json({ message: "Correctly created" });
    });

  } else {
    res.status(403).json(prodOutOfStock);
  }
}

// Update order in storage.
async function update(req, res) {
  //if admin, update the order
  //dont edit the order form the user specifically
}

// Remove order from storage.
async function destroy(req, res) { }

module.exports = {
  index,
  store,
  update,
  destroy,
};
