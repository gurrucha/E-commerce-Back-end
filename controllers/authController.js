const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//log a user/admin
async function login(req, res) {
  const user = await User.findOne({
    $or: [{ email: req.body.emailorUsername }, { username: req.body.emailorUsername }],
  });

  if (user.isAdmin) {
    const compare = await bcrypt.compare(req.body.password, user.password);

    if (compare) {
      const token = jwt.sign(
        { user: user.username, id: user.id, isAdmin: true },
        process.env.JWT_TOKEN_KEY,
      );

      return res.status(200).json({ token, isAdmin: true });
    } else {
      return res.status(400).json({ message: "Invalid credentials." });
    }
  } else if (user) {
    const compare = await bcrypt.compare(req.body.password, user.password);
    if (compare) {
      const token = jwt.sign({ user: user.username, id: user.id }, process.env.JWT_TOKEN_KEY);
      res.status(200).json({ token, isAdmin: false, userId: user.id });
    } else {
      return res.status(400).json({ message: "Invalid credentials." });
    }
  } else {
    return res.status(400).json({ message: "Invalid credentials." });
  }
}

//regist a user
async function store(req, res) {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.status(409).json({ message: "User already exists." });
  } else {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
    });
    newUser.save((error) => {
      if (error) {
        return res.status(400).json({ message: "A field is missing." });
      } else {
        return res.status(201).json({ message: "New user created." });
      }
    });
  }
}

module.exports = {
  login,
  store,
};
