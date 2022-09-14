const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");

//userRouter.get("/users", userController.index);
userRouter.get("/users", userController.show);
userRouter.patch("/users/:id", userController.update);
userRouter.delete("/users/:id", userController.destroy);

module.exports = userRouter;
