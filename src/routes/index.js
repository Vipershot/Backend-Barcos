const express = require("express");
const fs = require("fs");
const router = express.Router();

const PATH_ROUTES = __dirname; /* TODO */

const removeExtension = (fileName) => {
  return fileName.split(".").shift();
};

fs.readdirSync(PATH_ROUTES).filter((file) => {
  const name = removeExtension(file);
  if (name !== "index") {
    console.log(`Cargando rutas de ${name}`);
    router.use(`/${name}`, require(`./${file}`));
  }
});

module.exports = router;
