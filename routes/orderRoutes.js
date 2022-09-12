const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controllers/orderController");

//orderRouter.get("/orders", orderController.index);

//orderRouter.get("/orders/:id", orderController.show);

orderRouter.post("/orders", orderController.store);

orderRouter.patch("/orders/:id", orderController.update);

orderRouter.delete("/orders/:id", orderController.destroy);

module.exports = orderRouter;
