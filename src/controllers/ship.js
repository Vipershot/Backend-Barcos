const { shipModel } = require("../models");
const { uploadImage, cloudinary } = require("../utils/cloudinary");

/**
 * Acceso a listado de ships
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const ship = await shipModel.find({});
    res.send({ ship });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Acceso por id a un ship
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getItem = async (req, res) => {
  try {
    const ship = await shipModel.findById(req.params.id);
    if (!ship) {
      return res.status(404).json({ message: "Barco no encontrado" });
    }
    res.status(200).json(ship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Creacion de ship
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  try {
    const { body, file } = req;
    const result = await uploadImage(file.path);
    const ship = await shipModel.create({
      ...body,
      image: { imageUrl: result.url, public_Id: result.public_id },
    });
    res.send({ ship });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Eliminacion de ship mediante ID
 * @param {*} req
 * @param {*} res
 * @returns
 */
const deleteItem = async (req, res) => {
  try {
    const shipId = await shipModel.findById(req.params.id);
    const imgId = shipId.image.public_Id;
    await cloudinary.uploader.destroy(imgId);

    const ship = await shipModel.findByIdAndDelete(req.params.id);
    if (!ship) {
      return res.status(404).json({ message: "Barco no encontrada" });
    }
    res.status(200).json({ message: "Barco eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Actualizacion de la info Ship
 * @param {*} req
 * @param {*} res
 * @returns
 */
const updateItem = async (req, res) => {
  try {
    const { body, file } = req;
    const ship = await shipModel.findById(req.params.id);
    if (!ship) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    ship.shipName = req.body.shipName || ship.shipName;
    ship.shipColor = req.body.shipColor || ship.shipColor;
    ship.shipModel = req.body.shipModel || ship.shipModel;
    ship.shipYear = req.body.shipYear || ship.shipYear;
    if (req.body.image !== "") {
      const imgId = ship.image.public_Id;
      if (imgId) {
        await cloudinary.uploader.destroy(imgId);
      }
      const uploadImg = await uploadImage(file.path);
      ship.image = {
        public_Id: uploadImg.public_id,
        imageUrl: uploadImg.url,
      };
    }
    const updatedShip = await ship.save();
    res.status(200).json(updatedShip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getItems, createItem, getItem, deleteItem, updateItem };
