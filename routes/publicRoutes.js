const express = require("express");
const publicRouter = express.Router();
const productControll = require("../controllers/productController");
//import controllers

// publicRouter.post("/login", authController.login);

// publicRouter.post("/register", authController.register);

// publicRouter.get("/", userController.index);

publicRouter.get("/products", productControll.showAll);

publicRouter.get("/product/:id", productControll.showOne);

module.exports = publicRouter;
