const productRoutes = require("./productRoutes");
const orderRoutes = require("./orderRoutes");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const categoryRouter = require("./categoryRoutes");

module.exports = (app) => {
  app.use(authRoutes);
  app.use(productRoutes);
  app.use(userRoutes);
  app.use(orderRoutes);
  app.use(categoryRouter);
};
