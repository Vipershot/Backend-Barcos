import { NotFoundError } from "../errors/NotFoundError";
import { shipModel } from "../models";
import { uploadImage } from "../utils/cloudinary";

export class ShipsService {
  public async getShips(): Promise<unknown> {
    try {
      const response = await shipModel.find({});
      return response;
    } catch (error: unknown) {
      throw new Error("An unknown error occurred");
    }
  }

  public async getShip(id: string): Promise<unknown> {
    const response = await shipModel.findById(id);

    if(!response) {
      throw new NotFoundError(`ship with id: ${id} not found`);
    }

    return response;
  }

  public async createShip(body: any, file: any): Promise<unknown> {
    try {
      console.log("inicio");
      /* const result = await uploadImage(file.path); */
      const response = await shipModel.create({
        ...body,
        /*  image: { imageUrl: result.url, public_Id: result.public_id }, */
      });
      return response;
    } catch (error: unknown) {
      throw new Error("An error occurred while creating the ship");
    }
  }

  public async deleteShip(id: string): Promise<unknown> {
    try {
      const response = await shipModel.findByIdAndDelete(id);
      return response;
    } catch (error: unknown) {
      throw new Error("An unknown error occurred");
    }
  }

  public async updateShip(id: string, body: any): Promise<unknown> {
    try {
      const response = await shipModel.findById(id);
      if (!response) {
        throw new Error("Ship not found");
      }
      response.shipName =
        body.shipName !== "" || null ? body.shipName : response.shipName;
      response.shipColor =
        body.shipColor !== "" ? body.shipColor : response.shipColor;
      response.shipModel =
        body.shipModel !== "" ? body.shipModel : response.shipModel;
      response.shipYear =
        body.shipYear !== "" ? body.shipYear : response.shipYear;
      await response.save();
      return response;
    } catch (error: unknown) {
      throw new Error("An unknown error occurred");
    }
  }
}
