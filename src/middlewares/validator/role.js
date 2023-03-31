const { handleHttpError } = require("../../utils/handleError");

/**
 * Array con los roles permitidos
 * @param {*} role
 * @returns
 */

const checkRole = (roles) => (req, res, next) => {
  try {
    const { user } = req;
    console.log({ user });
    const rolesByUser = user.role;
    const checkValueRol = roles.some((roleSingle) =>
      rolesByUser.includes(roleSingle)
    );
    if (!checkValueRol) {
      handleHttpError(res, "USER_NOT_PERMISSIONS", 403);
    }
    next();
  } catch (error) {
    handleHttpError(res, "ERROR_NOT PERMISSIONS", 403);
  }
};

module.exports = checkRole;
