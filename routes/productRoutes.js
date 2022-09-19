const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/productController");
const categoryController = require("../controllers/categoryController");

productRouter.get("/products", productController.index);
//change to products
productRouter.get("/categories", categoryController.index);

productRouter.get("/product/:slug", productController.show);
productRouter.post("/products", productController.store);
productRouter.patch("/products/:slug", productController.update);
productRouter.delete("/products/:slug", productController.destroy);
productRouter.get("/products/random", productController.getRandom);

module.exports = productRouter;
