import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
  constructor(private authService: AuthService) {}

  public async login(req: Request, res: Response): Promise<unknown> {
    const { email, password } = req.body;

    const data = await this.authService.login(email, password);

    return res.json(data);
  }
}
