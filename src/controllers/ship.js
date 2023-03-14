const { shipModel } = require("../models");

const getItems = async (req, res) => {
  try {
    const ship = await shipModel.find({});
    res.send({ ship });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

const createItem = async (req, res) => {
  try {
    const { body } = req;
    const ship = await shipModel.create(body);
    res.send({ ship });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const ship = await shipModel.findByIdAndDelete(req.params.id);
    if (!ship) {
      return res.status(404).json({ message: "Barco no encontrada" });
    }
    res.status(200).json({ message: "Barco eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getItems, createItem, getItem, deleteItem };
