const express = require("express");
const categoryRouter = express.Router();
const categoryController = require("../controllers/categoryController");
const { expressjwt: jwt } = require("express-jwt");

const verifyJwt = jwt({
   secret: process.env.JWT_TOKEN_KEY,
   algorithms: ["HS256"],
});

categoryRouter.get("/categories", categoryController.index);

// To enter any of the routes the user must be logged in
categoryRouter.use(verifyJwt);

categoryRouter.get("/categories/products/:name", categoryController.show);
categoryRouter.post("/categories", categoryController.store);
categoryRouter.patch("/categories/:name", categoryController.update);
categoryRouter.delete("/categories/:name", categoryController.destroy);

module.exports = categoryRouter;