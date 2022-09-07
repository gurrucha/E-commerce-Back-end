require("dotenv").config();

const express = require("express");
const routes = require("./routes");
const APP_PORT = process.env.APP_PORT || 8000;
const app = express();
const userSeeder = require("./seeders/userSeeder.js");
const arrayData= require ("./db/dataFull")

const mongoose = require("./db/dbInitialSetup");
mongoose.connection
  .once("open", () => console.log("¡Conexión con la base de datos establecida!"))
  .on("error", (error) => console.log(error));

// (async function () {
//   await userSeeder();
//   console.log("la base de datos fue ejecutada");
// })();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

routes(app);

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});