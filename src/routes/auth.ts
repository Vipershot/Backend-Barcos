const express = require("express");
import { Request, Response } from "express";
import { AuthController } from "../controllers/AuthController";
import { AuthService } from "../services/AuthService";
const {
  validatorRegister,
  validatorLogin,
} = require("../middlewares/validator/auth");
const router = express.Router();

/* TODO GET,POST,DELETE,PUT */
const controller = new AuthController(new AuthService());

router.post("/login", validatorLogin, (request:Request, response:Response) => controller.login(request, response));

module.exports = router;
