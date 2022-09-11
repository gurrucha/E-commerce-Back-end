const express = require("express");
const publicRouter = express.Router();
const productControll = require("../controllers/productController");
const authController = require("../controllers/authController");

publicRouter.post("/login", authController.login);

publicRouter.post("/register", authController.store);

// publicRouter.get("/", userController.index);

publicRouter.get("/products", productControll.index);

publicRouter.get("/products/cart", productControll.showCart);

publicRouter.get("/products/random", productControll.getRandom);

//change product to porducts for rest model
publicRouter.get("/product/:id", productControll.show);

module.exports = publicRouter;
