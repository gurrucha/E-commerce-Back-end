const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//log a user/admin
async function login(req, res) {
  const admin = await User.findOne({
    $or: [
      { email: req.body.emailorUsername === "admin@admin.com" },
      { username: req.body.emailorUsername === "admin" },
    ],
  });

  const user = await User.findOne({
    $or: [{ email: req.body.emailorUsername }, { username: req.body.emailorUsername }],
  });

  if (admin) {
    const compare = await bcrypt.compare(req.body.password, user.password);

    if (compare) {
      const token = jwt.sign(
        { user: user.username, id: user.id, isAdmin: true },
        process.env.JWT_TOKEN_KEY,
      );
      res.status(200).json({ token });
    } else {
      res.status(400).json({ message: "Invalid credentials." });
    }
  } else if (user) {
    const compare = await bcrypt.compare(req.body.password, user.password);
    if (compare) {
      const token = jwt.sign(
        { user: user.username, id: user.id, isAdmin: false },
        process.env.JWT_TOKEN_KEY,
      );
      res.status(200).json({ token });
    } else {
      res.status(400).json({ message: "Invalid credentials." });
    }
  } else {
    res.status(400).json({ message: "Invalid credentials." });
  }
}

//regist a user
async function store(req, res) {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    res.status(409).json({ message: "User already exists." });
  } else {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
    });
    newUser.save((error) => {
      if (error) {
        res.status(400).json({ message: "A field is missing." });
      } else {
        res.status(201).json({ message: "New user created." });
      }
    });
  }
}

module.exports = {
  login,
  store,
};
