const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/productController");
const { expressjwt: jwt } = require("express-jwt");

const verifyJwt = jwt({
  secret: process.env.JWT_TOKEN_KEY,
  algorithms: ["HS256"],
});

productRouter.get("/products", productController.index);

//change to products
productRouter.get("/product/:slug", productController.show);

productRouter.post("/products", productController.store);

productRouter.patch("/products/:id", productController.update);

productRouter.delete("/products/:id", productController.destroy);

productRouter.get("/products/random", productController.getRandom);

module.exports = productRouter;
