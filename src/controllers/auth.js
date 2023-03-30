const { matchedData } = require("express-validator");
const { usersModel } = require("../models");
const { tokenSign } = require("../utils/handledJwt");
const { encrypt, compare } = require("../utils/handledPassword");
const { handleHttpError } = require("../utils/handleError");

/* REGISTER */
const registerCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const password = await encrypt(req.password);
    const body = { ...req, password };
    console.log(body);
    const dataUser = await usersModel.create(body);
    console.log(dataUser);
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

/* LOGIN */
const loginCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const user = await usersModel
      .findOne({ email: req.email })
      .select("email password");
    if (!user) {
      handleHttpError(res, "USER_NOT_EXIST", 404);
    }
    const hashPassword = user.get("password");
    console.log(hashPassword);
    const check = await compare(req.password, hashPassword);
    console.log(check);

    if (!check) {
      handleHttpError(res, "PASSWORD_INVALID", 401);
    }
    user.set("password", undefined, { strict: false });
    const data = {
      token: await tokenSign(user),
      user,
    };
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_LOGIN_USER");
  }
};

module.exports = { registerCtrl, loginCtrl };
