const { handleHttpError } = require("../../utils/handleError");
const { verifyToken } = require("../../utils/handledJwt");
const { usersModel } = require("../../models");

/**
 * Validacion de JWT
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleHttpError(res, "NOT_TOKEN", 401);
    }

    const token = req.headers.authorization.split(" ").pop();
    const dataToken = await verifyToken(token);
    console.log(dataToken);

    if (!dataToken._id) {
      handleHttpError(res, "ERROR_ID_TOKEN", 401);
    }

    const user = await usersModel.findById(dataToken._id);
    req.user = user;

    next();
  } catch (e) {
    handleHttpError(res, "NOT_SESSION", 401);
  }
};

module.exports = authMiddleware;
