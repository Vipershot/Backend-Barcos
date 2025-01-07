import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
  constructor(private authService: AuthService) {}

  public async login(req: Request, res: Response): Promise<unknown> {
    try {
      const { email, password } = req.body;

      const data = await this.authService.login(email, password);

      return res.json(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: "An unknown error occurred" });
    }
  }
}
