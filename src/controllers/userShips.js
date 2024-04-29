const { matchedData } = require("express-validator");
const { usersModel } = require("../models");
const { tokenSign } = require("../utils/handledJwt");
const { encrypt } = require("../utils/handledPassword");
const { handleHttpError } = require("../utils/handleError");

/* REGISTER */

/**
 * Registro de usuario
 * @param {*} req
 * @param {*} res
 */
const registerCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const password = await encrypt(req.password);
    const body = { ...req, password };
    const dataUser = await usersModel.create(body);
    dataUser.set("password", undefined, { strict: false });

    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_REGISTER_USER");
  }
};




module.exports = { registerCtrl };