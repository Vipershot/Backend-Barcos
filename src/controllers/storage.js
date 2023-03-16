const { storageModel } = require("../models/index");
const cloudinary = require("../utils/cloudinary");
const { handleHttpError } = require("../utils/handleError");
const PUBLIC_URL = process.env.PUBLIC_URL;

const getItems = async (req, res) => {
  try {
    const data = await storageModel.find({});
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_GET_ALL_STORAGE");
  }
};
const getItem = (req, res) => {};

const createItem = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(req.file.path);
    res.status(200).json({
      success: true,
      url: result.secure_url,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "Error al cargar imagen",
    });
  }
};
const updateItems = (req, res) => {};
const deleteItems = (req, res) => {};

module.exports = { getItems, getItem, createItem, updateItems, deleteItems };
