const { matchedData } = require("express-validator");
const { usersModel } = require("../models");
const { tokenSign } = require("../utils/handledJwt");
const { compare } = require("../utils/handledPassword");
const { handleHttpError } = require("../utils/handleError");

/**
 * Login comparacion password hash
 * @param {*} req
 * @param {*} res
 */
/* LOGIN */
const loginCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const user = await usersModel
      .findOne({ email: req.email })
      .select("email password userName firstName lastName role ships");
    if (!user) {
      handleHttpError(res, "USER_NOT_EXIST", 404);
    }
    const hashPassword = user.get("password");
    const check = await compare(req.password, hashPassword);

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

module.exports = { loginCtrl };
