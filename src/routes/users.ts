import { Request, Response } from "express";
import { RegisterController } from "../controllers/RegisterController";
import { RegisterService } from "../services/RegisterService";

const express = require("express");
const { validatorRegister } = require("../middlewares/validator/auth");
const router = express.Router();

/* TODO GET,POST,DELETE,PUT */

const controller = new RegisterController(new RegisterService());

router.post(
  "/register",
  validatorRegister,
  (request: Request, response: Response) =>
    controller.register(request, response)
);


module.exports = router;
