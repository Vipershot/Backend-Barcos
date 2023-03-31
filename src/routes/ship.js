const express = require("express");
const {
  getItems,
  getItem,
  createItem,
  deleteItem,
  updateItem,
} = require("../controllers/ship");
const { validatorCreateItem } = require("../middlewares/validator/ship");
const router = express.Router();
const authMiddleware = require("../middlewares/validator/session");
const checkRole = require("../middlewares/validator/role");

/* TODO GET,POST,DELETE,PUT */

router.get("/", authMiddleware, getItems);
router.get("/:id", getItem);
router.post(
  "/",
  authMiddleware,
  checkRole(["admin"]),
  validatorCreateItem,
  createItem
);
router.delete("/:id", deleteItem);
router.put("/:id", updateItem);

module.exports = router;
