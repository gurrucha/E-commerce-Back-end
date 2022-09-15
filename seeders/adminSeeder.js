const User = require("../models/User");

module.exports = async () => {
  await User.create({
    firstname: "Random",
    lastname: "Random",
    username: "random",
    email: "admin@admin.com",
    password: "123",
    phone: 123456789,
    adress: "Random Street 1234",
    isAdmin: true,
  });
};
