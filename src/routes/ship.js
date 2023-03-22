const express = require("express");
const {
  getItems,
  getItem,
  createItem,
  deleteItem,
} = require("../controllers/ship");
const { validatorCreateItem } = require("../middlewares/validator/ship");
const router = express.Router();

/* TODO GET,POST,DELETE,PUT */

router.get("/", getItems);
router.get("/:id", getItem);
router.post("/", /* validatorCreateItem, */ createItem);
router.delete("/:id", deleteItem);

module.exports = router;
