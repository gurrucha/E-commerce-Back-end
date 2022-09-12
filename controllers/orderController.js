const { Order } = require("../models");

// Display orders of user.
async function showAll(req, res) {
  //if logged show history of orders
}

// Store a new order in storage and in the specified user.
async function store(req, res) {
  const newUser = new Order({
    email: req.body.email,
    password: req.body.password,
  });
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
