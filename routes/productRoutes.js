const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/productController");

productRouter.get("/products", productController.index);
productRouter.get("/product/:slug", productController.show);
productRouter.post("/products", productController.store);
productRouter.patch("/products/:slug", productController.update);
productRouter.delete("/products/:slug", productController.destroy);
productRouter.get("/products/random", productController.getRandom);

module.exports = productRouter;
