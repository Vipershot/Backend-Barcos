import { Request, Response } from "express";
import { ShipsService } from "../services/ShipService";

export class ShipsController {
  constructor(private shipsService: ShipsService) {}

  public async getShips(req: Request, res: Response): Promise<unknown> {
    try {
      const response = await this.shipsService.getShips();

      return res.json(response);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: "An unknown error occurred" });
    }
  }

  public async getShip(req: Request, res: Response): Promise<unknown> {
    try {
      const response = await this.shipsService.getShip(req.params.id);

      return res.json(response);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: "An unknown error occurred" });
    }
  }

  public async createShip(req: Request, res: Response): Promise<Response> {
    try {
      const response = await this.shipsService.createShip(req.body, req.file);

      return res.json(response);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: "An unknown error occurred" });
    }
  }

  public async deleteShip(req: Request, res: Response): Promise<Response> {
    try {
      const response = await this.shipsService.deleteShip(req.params.id);

      return res.json(response);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: "An unknown error occurred" });
    }
  }

  public async updateShip(req: Request, res: Response): Promise<Response> {
    try {
      const response = await this.shipsService.updateShip(req.params.id, req.body);

      return res.json(response);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: "An unknown error occurred" });
    }
  }
}
