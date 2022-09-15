const { User } = require("../models");

async function show(req, res) {
  const allUsers = await User.find();
  res.json(allUsers);
}

async function loggedUser(req, res) {
  const user = await User.findById(req.params.id).select(
    "firstname lastname username email adress phone orderHistory",
  );

  res.status(200).json({ user: user });
}

// Update user in storage.
async function update(req, res) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      phone: req.body.phone,
      adress: req.body.adress,
    });
    res.status(200).json({ Message: "User information updated!" });
  } catch (error) {
    res.status(400).json({ Message: "Can't update user information." });
  }

  //Validate if logged
  //user y admin pueden cambiar info
}

// Remove user from storage.
async function destroy(req, res) {
  //depende del id de la url devolver true o false, y lo borra si el id es de admin
  //validate if the id is not from admin himself (no admin can delete himself)
}

// Otros handlers...
// ...

module.exports = {
  loggedUser,
  show,
  update,
  destroy,
};
