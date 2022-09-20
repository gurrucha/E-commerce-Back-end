const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controllers/orderController");
const { expressjwt: jwt } = require("express-jwt");

const verifyJwt = jwt({
  secret: process.env.JWT_TOKEN_KEY,
  algorithms: ["HS256"],
});

// To enter any of the routes the user must be logged in
orderRouter.use(verifyJwt);

orderRouter.get("/orders", orderController.index);
orderRouter.get("/orders/:id", orderController.show);
orderRouter.post("/orders", orderController.store);
orderRouter.patch("/orders/:id", orderController.update);
orderRouter.delete("/orders/:id", orderController.destroy);

module.exports = orderRouter;
