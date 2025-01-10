import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { RegisterService } from "../services/RegisterService";

export class RegisterController {
  constructor(private registerService: RegisterService) {}

  public async register(req: Request, res: Response): Promise<unknown> {
    const data = matchedData(req);
    const { email, password, userName, firstName, lastName, age } = data;

    const response = await this.registerService.register(
      email,
      password,
      userName,
      firstName,
      lastName,
      age
    );

    return res.json(response);
  }
}
