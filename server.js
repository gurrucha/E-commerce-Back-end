require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const APP_PORT = process.env.APP_PORT || 8000;
const app = express();
const productSeeder = require("./seeders/productSeeder.js");
const adminSeeder = require("./seeders/adminSeeder.js");
const categorySeeder = require("./seeders/categorySeeder.js");
const cors = require("cors");

const mongoose = require("./db/dbInitialSetup");
mongoose.connection
  .once("open", () => console.log("¡Conexión con la base de datos establecida!"))
  .on("error", (error) => console.log(error));

// (async function () {
//   await mongoose.connection.dropDatabase();
//   await productSeeder();
//   await adminSeeder();
//   await categorySeeder();
//   console.log("La base de datos fue ejecutada");
// })();

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes(app);

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
