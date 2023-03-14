const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorCreateItem = [
  check("shipName").exists().notEmpty(),
  check("shipModel").exists().notEmpty(),
  check("shipColor").exists().notEmpty(),
  check("shipYear").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorCreateItem };
