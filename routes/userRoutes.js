const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const { expressjwt: jwt } = require("express-jwt");

const verifyJwt = jwt({
  secret: process.env.JWT_TOKEN_KEY,
  algorithms: ["HS256"],
});

userRouter.get("/users", userController.index);
userRouter.get("/users/:id", verifyJwt, userController.show);
userRouter.patch("/users/:id", verifyJwt, userController.update);
userRouter.delete("/users/:id", userController.destroy);

module.exports = userRouter;
