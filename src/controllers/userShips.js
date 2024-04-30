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
    const body = { ...req, password};
    console.log(body)
    const dataUser = await usersModel.create(body);
    dataUser.set("password", undefined, { strict: false });

    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };
    console.log(data)
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_REGISTER_USER");
  }
};

/* REGISTER */

/**
 * Editar usuario
 * @param {*} req
 * @param {*} res
 */
const editUserCtrl = async (req, res) => {
   try {
      // Extraer la información del usuario autenticado
      const userId = req.user.id; // Asume que el middleware de autenticación añade el usuario a req.user
  
      // Extraer los datos de la solicitud
      req = matchedData(req);
      const updateData = {};
  
      // Verificar si se ha proporcionado una nueva contraseña y encriptarla
      if (req.password) {
        const encryptedPassword = await encrypt(req.password);
        updateData.password = encryptedPassword;
      }
  
      // Actualizar otros campos permitidos
      if (req.email) updateData.email = req.email;
      if (req.username) updateData.username = req.username;
  
      // Actualizar la información del usuario en la base de datos
      const updatedUser = await usersModel.findByIdAndUpdate(userId, updateData, { new: true });
  
      // Eliminar la contraseña del objeto de usuario antes de enviar la respuesta
      updatedUser.set("password", undefined, { strict: false });
  
      res.send({ data: updatedUser });
   } catch (error) {
      handleHttpError(res, "ERROR_EDIT_USER");
   }
  };




module.exports = { registerCtrl, editUserCtrl };