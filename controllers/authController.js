const { User } = require("../models");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

//log a user
async function login(req, res) {
  const user = await User.findOne({
    $or: [{ email: req.body.emailorUsername }, { username: req.body.emailorUsername }],
  });

  // if (user) {

  //   // No estoy seguro si el compare de la
  //   // password se hace aca
  //   const compare = await bcrypt.compare(req.body.password);
  //   if (compare) {
  //     const token = jwt.sign({ user: user.username, id: user.id }, process.env.JWT_TOKEN_KEY);
  //     res.status(200).json({ token });
  //   } else {
  //     res.status(400).json({ message: "Invalid credentials." });
  //   }
  // } else {
  //   res.status(400).json({ message: "Invalid credentials." });
  // }
}

//regist a user
async function store(req, res) {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    res.status(409).json({ message: "User already exists" });
  } else {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
    });
    newUser.save((error) => {
      if (error) return res.status(400).json({ message: "A field is missing." });
      res.status(201).json({ message: "New user created." });
    });
  }
}

// async function token(req,res){
//   const user = await User.findOne({
//     $or: [{ ema}]
//   })
// }

module.exports = {
  login,
  store,
};
