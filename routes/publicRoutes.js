const express = require("express");
const publicRouter = express.Router();
const productControll = require("../controllers/productController");
//import controllers

// publicRouter.post("/login", authController.login);

// publicRouter.post("/register", authController.register);

// publicRouter.get("/", userController.index);

publicRouter.get("/products", productControll.index);

publicRouter.get("/product/:id", productControll.show);

module.exports = publicRouter;
