import { Request, Response } from "express";
import { ShipsController } from "../controllers/ShipsController";
import { ShipsService } from "../services/ShipService";

const express = require("express");
const {
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

const controller = new ShipsController(new ShipsService());

router.get("/", (request: Request, response: Response) =>
  controller.getShips(request, response)
);
router.get("/:id", (request: Request, response: Response) =>
  controller.getShip(request, response)
);
router.post(
  "/",
  /*   authMiddleware,
  checkRole(["admin"]), */
  /* validatorCreateItem, */
  (request: Request, response: Response) =>
    controller.createShip(request, response)
);
router.delete("/delete/:id", (request: Request, response: Response) =>
  controller.deleteShip(request, response)
);
router.put("/edit/:id", (request: Request, response: Response) =>
  controller.updateShip(request, response)
);

module.exports = router;
