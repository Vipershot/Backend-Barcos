const express = require("express");
const { registerCtrl, loginCtrl } = require("../controllers/auth");
const {
  validatorRegister,
  validatorLogin,
} = require("../middlewares/validator/auth");
const router = express.Router();

/* TODO GET,POST,DELETE,PUT */

router.post("/register", validatorRegister, registerCtrl);
router.post("/login", validatorLogin, loginCtrl);

module.exports = router;
