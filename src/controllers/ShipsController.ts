import { Request, Response } from "express";
import { ShipsService } from "../services/ShipService";

export class ShipsController {
  constructor(private shipsService: ShipsService) {}

  public async getShips(req: Request, res: Response): Promise<unknown> {
    const response = await this.shipsService.getShips();

    return res.json(response);
  }

  public async getShip(req: Request, res: Response): Promise<unknown> {
    const response = await this.shipsService.getShip(req.params.id);

    return res.json(response);
  }

  public async createShip(req: Request, res: Response): Promise<Response> {
    const response = await this.shipsService.createShip(req.body, req.file);

    return res.json(response);
  }

  public async deleteShip(req: Request, res: Response): Promise<Response> {
    const response = await this.shipsService.deleteShip(req.params.id);

    return res.json(response);
  }

  public async updateShip(req: Request, res: Response): Promise<Response> {
    const response = await this.shipsService.updateShip(
      req.params.id,
      req.body
    );

    return res.json(response);
  }
}
