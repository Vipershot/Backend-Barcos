const { check } = require("express-validator");
const validateResults = require("../../utils/handleValidator");

/**
 * Validacion de los campos registro
 */
const validatorRegister = [
  check("firstName").exists().notEmpty().isLength({ min: 3, max: 99 }),
  check("lastName").exists().notEmpty().isLength({ min: 3, max: 99 }),
  check("userName").exists().notEmpty().isLength({ min: 3, max: 99 }),
  check("age").exists().notEmpty().isNumeric({ min: 18, max: 100 }),
  check("password").exists().notEmpty().isLength({ min: 3, max: 15 }),
  check("email").exists().notEmpty().isEmail(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

/**
 * Validacion login
 */
const validatorLogin = [
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 3, max: 15 }),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorRegister, validatorLogin };
