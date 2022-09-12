const { User } = require("../models");

async function show(req, res) {
  const allUsers = await User.find();
  res.json(allUsers);
}

// Update user in storage.
async function update(req, res) {
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
  show,
  update,
  destroy,
};
