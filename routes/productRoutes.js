const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/productController");

productRouter.get("/products", productController.index);

//change to products
productRouter.get("/product/:id", productController.show);

productRouter.post("/products", productController.store);

productRouter.patch("/products/:id", productController.update);

productRouter.delete("/products/:id", productController.destroy);

productRouter.get("/products/random", productController.getRandom);

module.exports = productRouter;
