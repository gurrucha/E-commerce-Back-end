const { Order } = require("../models");

// Display orders of user.
async function showAll(req, res) {
  //if logged show history of orders
}

// Store a new order in storage and in the specified user.
async function store(req, res) {
  console.log("req.body", req.body);
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  const formattedToday = dd + "/" + mm + "/" + yyyy;

 
  console.log("formattedToday", formattedToday);
  const newOrder = new Order({
    name: req.body.name,
    user: req.body.users,
    companyName: req.body.companyName,
    adress: req.body.adress,
    city: req.body.city,
    postalCode: req.body.postalCode,
    telephone: req.body.telephone,
    mail: req.body.mail,
    additionalDescription: req.body.additionalDescription,
    products: req.body.products,
    createdAt: formattedToday,
  });
  console.log("newOrder", newOrder);
}

// Update order in storage.
async function update(req, res) {
  //if admin, update the order
  //dont edit the order form the user specifically
}

// Remove order from storage.
async function destroy(req, res) {}

module.exports = {
  showAll,
  store,
  update,
  destroy,
};
