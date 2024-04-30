const express = require("express");
const {registerCtrl, editUserCtrl} = require("../controllers/userShips")
const { validatorRegister } = require("../middlewares/validator/auth");
const router = express.Router();

/* TODO GET,POST,DELETE,PUT */

router.post("/register", validatorRegister, registerCtrl);
router.put("/:id", editUserCtrl);

module.exports = router;
