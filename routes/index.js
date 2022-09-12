const productRoutes = require("./productRoutes");
const orderRoutes = require("./orderRoutes");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");

module.exports = (app) => {
  app.use(authRoutes);
  app.use(productRoutes);
  app.use(userRoutes);
  app.use(orderRoutes);
};
