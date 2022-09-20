const { User } = require("../models");
const bcrypt = require("bcryptjs");

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
    const user = await User.findById(req.params.id);
    console.log("USUARIO:", user);
    console.log("currentPassword:", req.body.currentPassword);
    console.log("newPassword:", req.body.newPassword);
    console.log("userPassword:", user.password);
    if (user) {
      const compare = await bcrypt.compare(req.body.currentPassword, user.password);
      console.log(compare);

      if (compare) {
        const userProfileInfo = await User.findByIdAndUpdate(req.params.id, {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          username: req.body.username,
          phone: req.body.phone,
          adress: req.body.adress,
          password: req.body.newPassword ? req.body.newPassword : user.password,
        });
        userProfileInfo.save();
        return res.status(200).json({ Message: "Se actualizó la información del usuario!" });
      } else {
        return res.status(400).json({ message: "Invalid hola credentials." });
      }
    }
  } catch (error) {
    res.status(400).json({ Message: "No se pudo actualizar la información del usuario." });
  }

  //Validate if logged
  //user y admin pueden cambiar info
}

// Remove user from storage.
async function destroy(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user.isAdmin) {
      await User.findByIdAndDelete(req.params.id);
      const newListUsers = await User.find({ _id: { $nin: req.params.id } });
      return res.status(200).json(newListUsers);
    } else {
      return res.status(401).json({ message: "No se puede borrar el admin loggeado" });
    }

  } catch (error) {
    res.status(500);
  }
}

module.exports = {
  loggedUser,
  show,
  update,
  destroy,
};
