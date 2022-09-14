const { Order } = require("../models");
const { User } = require("../models");
const { Product } = require("../models");


// Display orders of user.
async function showAll(req, res) {
  //if logged show history of orders
}

// Store a new order in storage and in the specified user.
async function store(req, res) {
  //format the data for when the product was created
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  const formattedToday = dd + "/" + mm + "/" + yyyy;
  let stockValid = true;
  const prodOutOfStock = []

  //validate stock
  console.log(req.body.order.products)
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
      user: req.body.userId,
      companyName: req.body.order.companyName,
      adress: req.body.order.adress,
      city: req.body.order.city,
      postalCode: req.body.order.postalCode,
      telephone: req.body.order.telephone,
      mail: req.body.order.mail,
      additionalDescription: req.body.order.additionalDescription,
      products: req.body.order.products,
      createdAt: formattedToday,
    });

    await User.findByIdAndUpdate(req.body.userId, {
      $push: { orderHistory: newOrder },
    });
    newOrder.save(function (err) {
      if (err) return res.json(404);
      return res.json(200);
    });

    //sacarle a los productos el stock
  } else {
    //mandar cuales estan agotados y que dio error
    res.json(prodOutOfStock);
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
  showAll,
  store,
  update,
  destroy,
};
