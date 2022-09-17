const express = require("express");
const categoryRouter = express.Router();
const categoryController = require("../controllers/categoryController");
const { expressjwt: jwt } = require("express-jwt");

const verifyJwt = jwt({
   secret: process.env.JWT_TOKEN_KEY,
   algorithms: ["HS256"],
});

// To enter any of the routes the user must be logged in
categoryRouter.use(verifyJwt);

categoryRouter.get("/categories", categoryController.index);
categoryRouter.get("/categories/:name", categoryController.show);
categoryRouter.get("/categories/products/:name", categoryController.showByCategory);
categoryRouter.post("/categories", categoryController.store);
categoryRouter.patch("/categories/:name", categoryController.update);
categoryRouter.delete("/categories/:name", categoryController.destroy);

module.exports = categoryRouter;