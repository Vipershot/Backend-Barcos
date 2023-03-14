const { shipModel } = require("../models");

const getItems = async (req, res) => {
  const data = await shipModel.find({});
  res.send({ data });
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
  const { body } = req;
  const data = await shipModel.create(body);
  res.send({ data });
};

module.exports = { getItems, createItem, getItem };
