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
  try {
    await User.findByIdAndDelete(req.params.id);
    const newListUsers = await User.find({ _id: { $nin: req.params.ids } })
    res.status(200).json(newListUsers);
  } catch (error) {
    res.status(500);
  }
}

module.exports = {
  show,
  update,
  destroy,
};
