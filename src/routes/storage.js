const express = require("express");
const { createItem, getItems } = require("../controllers/storage");
const router = express.Router();
const upload = require("../utils/handleStorage");

router.get("/", getItems);
router.post("/", upload.single("image"), createItem);

module.exports = router;
