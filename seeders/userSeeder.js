const User = require("../models/User");

module.exports = async () => {
  await User.create({
    firstname: "mechu",
    lastname: "Torrendell",
    email: "me voy",
    password: "123",
    phone: "123123123",
    adress: [
      { miriam: "miriam123", casa: "abo" },
      { miriam: "denis", casa: "lola" },
    ],
    orderHistory: [
      { pipa: "lucas", loli: "abo" },
      { capa: "maia", tropi: "123123123", maria: 2 },
    ],
    isAdmin: false,
  });
};
